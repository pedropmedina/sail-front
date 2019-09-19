/* eslint-disable no-console, react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import * as Styled from './styled';
import Context from '../../context';
import { GET_PINS_QUERY } from '../../graphql/queries';
import {
  CREATE_DRAFT_PIN,
  UPDATE_DRAFT_PIN,
  DELETE_DRAFT_PIN,
  GET_PINS,
  UPDATE_CURRENT_PIN,
  DELETE_CURRENT_PIN,
  SET_POPUP_PIN,
  DELETE_POPUP_PIN,
  SHOW_DRAFT_PIN_POPUP,
  UPDATE_VIEWPORT
} from '../../reducer';

import Map from '../../components/Map';
import Sidebar from '../../components/Sidebar';

const App = props => {
  const { state, dispatch } = useContext(Context);
  const {
    draftPin,
    currentPin,
    pins,
    isLoggedIn,
    popupPin,
    showDraftPinPopup,
    viewport,
    draftPlan
  } = state;
  const [showBtns, setShowBtns] = useState(false);

  const [getPins, { data: getPinsData }] = useLazyQuery(GET_PINS_QUERY);
  useEffect(() => {
    getPins();
  }, [getPins]);

  useEffect(() => {
    // getPinsData is updated upon the creation of new pin via cache.writeQuery in
    // PinMutation component making obsolete the need to dispath the new pin to Context
    // as we dispatch all pins in apollo cache at once
    if (getPinsData) {
      dispatch({ type: GET_PINS, payload: getPinsData.pins });
    }
  }, [dispatch, getPinsData]);

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

  const handleClickGeocodingResult = result => {
    // set viewport based on clicked result
    const [longitude, latitude] = result.center;
    dispatch({
      type: UPDATE_VIEWPORT,
      payload: { longitude, latitude, zoom: 13 }
    });
    // check for matching pin with given coordinates
    const pin = pins.find(
      pin => pin.longitude === longitude && pin.latitude === latitude
    );
    // if pin, set currentPin else new draft pin
    if (pin) {
      dispatch({ type: UPDATE_CURRENT_PIN, payload: pin });
    } else {
      dispatch({ type: DELETE_CURRENT_PIN });
      dispatch({ type: CREATE_DRAFT_PIN });
      dispatch({ type: UPDATE_DRAFT_PIN, payload: { longitude, latitude } });
      dispatch({ type: SHOW_DRAFT_PIN_POPUP, payload: true });
    }
  };

  const handleClickDraftPinPopup = (action = 'create') => {
    if (action === 'cancel') {
      dispatch({ type: DELETE_DRAFT_PIN });
      // send back to /create-plan if popup was initiated while creating new plan
      if (draftPlan) {
        props.history.push('/create-plan');
      }
    }
    dispatch({ type: SHOW_DRAFT_PIN_POPUP, payload: false });
  };

  return (
    <Styled.App>
      {isLoggedIn && <Sidebar />}
      <Map
        viewport={viewport}
        pins={pins}
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
        onClickDraftPinPopup={handleClickDraftPinPopup}
      />
    </Styled.App>
  );
};

export default App;
