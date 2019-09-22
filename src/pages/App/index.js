/* eslint-disable no-console, react/prop-types */
import React, { useState, useContext } from 'react';
import { useApolloClient } from '@apollo/react-hooks';

import * as Styled from './styled';
import Context from '../../context';
import { GET_PIN_BY_COORDS } from '../../graphql/queries';
import {
  CREATE_DRAFT_PIN,
  UPDATE_DRAFT_PIN,
  DELETE_DRAFT_PIN,
  UPDATE_CURRENT_PIN,
  DELETE_CURRENT_PIN,
  SET_POPUP_PIN,
  DELETE_POPUP_PIN,
  SHOW_DRAFT_PIN_POPUP,
  UPDATE_VIEWPORT,
  CREATE_DRAFT_PIN_POPUP,
  UPDATE_DRAFT_PIN_POPUP,
  DELETE_DRAFT_PIN_POPUP
} from '../../reducer';

import Map from '../../components/Map';
import Sidebar from '../../components/Sidebar';

const App = props => {
  const client = useApolloClient();
  const { state, dispatch } = useContext(Context);
  const {
    draftPin,
    currentPin,
    isLoggedIn,
    popupPin,
    showDraftPinPopup,
    draftPinPopup,
    viewport,
    draftPlan
  } = state;
  const [showBtns, setShowBtns] = useState(false);

  const handleClickMarker = pin => {
    // remove existing draft pin
    dispatch({ type: DELETE_DRAFT_PIN });
    // dispatch clicked pin's info to context
    dispatch({ type: UPDATE_CURRENT_PIN, payload: pin });
  };

  const handleOnMouseEnterMarker = pin => {
    dispatch({ type: SET_POPUP_PIN, payload: pin });
  };

  const handleOnMouseLeaveMarker = () => {
    dispatch({ type: DELETE_POPUP_PIN });
  };

  const handleCreateDraftPin = () => {
    // make sure there's not existing draft pin
    if (draftPin) return;

    dispatch({ type: DELETE_CURRENT_PIN });
    dispatch({ type: CREATE_DRAFT_PIN });

    const { longitude, latitude } = viewport;
    dispatch({
      type: UPDATE_DRAFT_PIN,
      payload: { longitude, latitude }
    });

    setShowBtns(false);
  };

  const handleViewportChange = viewport => {
    const { longitude, latitude, zoom } = viewport;
    dispatch({ type: UPDATE_VIEWPORT, payload: { longitude, latitude, zoom } });
  };

  const handleToggleNewBtns = () => {
    setShowBtns(!showBtns);
  };

  const handleDragEnd = ({ lngLat }) => {
    const [longitude, latitude] = lngLat;
    dispatch({ type: UPDATE_DRAFT_PIN, payload: { longitude, latitude } });
  };

  const handleShowBtnsState = bool => {
    setShowBtns(bool);
  };

  const handleClickGeocodingResult = async result => {
    // set viewport based on clicked result
    const [longitude, latitude] = result.center;
    dispatch({
      type: UPDATE_VIEWPORT,
      payload: { longitude, latitude, zoom: 13 }
    });
    // check for matching pin with given coordinates
    const { data } = await client.query({
      query: GET_PIN_BY_COORDS,
      variables: { input: { longitude, latitude } }
    });

    // show pin details or prompt user to create new pin
    if (data && data.pin) {
      if (showDraftPinPopup) {
        dispatch({ type: SHOW_DRAFT_PIN_POPUP, payload: false });
      }
      dispatch({ type: UPDATE_CURRENT_PIN, payload: data.pin });
    } else {
      dispatch({ type: DELETE_CURRENT_PIN });
      dispatch({ type: CREATE_DRAFT_PIN_POPUP });
      dispatch({
        type: UPDATE_DRAFT_PIN_POPUP,
        payload: { longitude, latitude }
      });
      dispatch({ type: SHOW_DRAFT_PIN_POPUP, payload: true });
    }
  };

  const handleClickDraftPinPopup = (action = 'create') => {
    if (action === 'cancel') {
      // send back to /create-plan if popup was initiated while creating new plan
      if (draftPlan) {
        props.history.push('/create-plan');
      }
    } else {
      dispatch({ type: CREATE_DRAFT_PIN });
      dispatch({ type: UPDATE_DRAFT_PIN, payload: draftPinPopup });
    }

    dispatch({ type: SHOW_DRAFT_PIN_POPUP, payload: false });
    dispatch({ type: DELETE_DRAFT_PIN_POPUP });
  };

  return (
    <Styled.App>
      {isLoggedIn && <Sidebar />}
      <Map
        viewport={viewport}
        draftPin={draftPin}
        currentPin={currentPin}
        showBtns={showBtns}
        onViewportChange={handleViewportChange}
        onDragEnd={handleDragEnd}
        onCreateDraftPin={handleCreateDraftPin}
        onClickMarker={handleClickMarker}
        onToggleNewBtns={handleToggleNewBtns}
        onChangeShowBtnsState={handleShowBtnsState}
        onMouseEnterMarker={handleOnMouseEnterMarker}
        onMouseLeaveMarker={handleOnMouseLeaveMarker}
        onClickGeocodingResult={handleClickGeocodingResult}
        isLoggedIn={isLoggedIn}
        popupPin={popupPin}
        showDraftPinPopup={showDraftPinPopup}
        draftPinPopup={draftPinPopup}
        onClickDraftPinPopup={handleClickDraftPinPopup}
        draftPlan={draftPlan}
      />
    </Styled.App>
  );
};

export default App;
