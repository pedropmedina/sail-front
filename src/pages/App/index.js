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
  DELETE_POPUP_PIN
} from '../../reducer';

import Map from '../../components/Map';
import Sidebar from '../../components/Sidebar';

// set viewport to this initial values upon mounting component
const INITIAL_VIEWPORT = {
  longitude: -122.4376,
  latitude: 37.7577,
  zoom: 13
};

const App = () => {
  const { state, dispatch } = useContext(Context);
  const { draftPin, currentPin, pins, isLoggedIn, popupPin } = state;
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
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
    setViewport(viewport);
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
        isLoggedIn={isLoggedIn}
        popupPin={popupPin}
      />
    </Styled.App>
  );
};

export default App;
