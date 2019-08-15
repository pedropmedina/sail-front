/* eslint-disable no-console, react/prop-types */
import React, { useState, useContext } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import * as Styled from './styled';
import Context from '../../context';
import { CREATE_DRAFT_PIN, UPDATE_DRAFT_PIN } from '../../reducer';

import PlusIcon from '../../assets/SVG/plus.svg';
import MapPin from '../../assets/SVG/map-pin.svg';
import CompassIcon from '../../assets/SVG/compass.svg';
import PinIcon from '../../assets/SVG/map-pin.svg';

import PinQuery from '../PinQuery';
import PinMutation from '../PinMutation';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoicGVkcm9wbWVkaW5hIiwiYSI6ImNqdzQ1ZHR3dDFiOTk0MHBzNzl1MGhkdjEifQ._BtibRIagOlzgXg1tat1Yg';

const INITIAL_VIEWPORT = {
  longitude: -122.4376,
  latitude: 37.7577,
  zoom: 13
};

const Map = () => {
  const { state, dispatch } = useContext(Context);
  const { draftPin, currentPin } = state;
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [showAddNewButtons, setShowAddNewButtons] = useState(false);

  const handleCreateDraftPin = () => {
    // make sure there's not existing draft pin
    if (draftPin) return;
    // start with a clean slate
    dispatch({ type: CREATE_DRAFT_PIN });
    // get longitude and latitude from the current viewport and update draft pin
    const { longitude, latitude } = viewport;
    dispatch({
      type: UPDATE_DRAFT_PIN,
      payload: { longitude, latitude }
    });
    // hide buttons
    setShowAddNewButtons(false);
  };

  const handleDragEnd = ({ lngLat }) => {
    const [longitude, latitude] = lngLat;
    dispatch({ type: UPDATE_DRAFT_PIN, payload: { longitude, latitude } });
  };

  let Pin =
    !!draftPin && !currentPin
      ? PinMutation
      : !draftPin && !!currentPin
      ? PinQuery
      : null;

  return (
    <Styled.Map>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100vh"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={viewport => setViewport(viewport)}
      >
        {draftPin && (
          <Marker {...draftPin} draggable={true} onDragEnd={handleDragEnd}>
            <MapPin className="map-pin" />
          </Marker>
        )}
      </ReactMapGL>

      {/* Create/Edit Pin or display current Pin */}
      {Pin && <Pin isMutation={!!draftPin} isQuery={!!currentPin} />}

      {/* Create New Pins and Plans Buttons */}
      <Styled.NewButton
        showAddNewButtons={showAddNewButtons}
        onClick={() => setShowAddNewButtons(!showAddNewButtons)}
      >
        <PlusIcon className="button-icon" />
      </Styled.NewButton>
      <Styled.CreateNew>
        <Styled.NewPlanButton onClick={() => setShowAddNewButtons(false)}>
          <CompassIcon className="button-icon" />
        </Styled.NewPlanButton>
        <Styled.NewPinButton onClick={handleCreateDraftPin}>
          <PinIcon className="button-icon" />
        </Styled.NewPinButton>
      </Styled.CreateNew>
    </Styled.Map>
  );
};

export default Map;
