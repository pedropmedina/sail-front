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

const MAPBOX_TOKEN =
  'pk.eyJ1IjoicGVkcm9wbWVkaW5hIiwiYSI6ImNqdzQ1ZHR3dDFiOTk0MHBzNzl1MGhkdjEifQ._BtibRIagOlzgXg1tat1Yg';

const INITIAL_VIEWPORT = {
  longitude: -122.4376,
  latitude: 37.7577,
  zoom: 13
};

const Map = () => {
  const { state, dispatch } = useContext(Context);
  const { draftPin } = state;
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);

  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return;
    if (!draftPin) dispatch({ type: CREATE_DRAFT_PIN });
    if (draftPin && (draftPin.longitude === 0 && draftPin.latitude === 0)) {
      const [longitude, latitude] = lngLat;
      dispatch({ type: UPDATE_DRAFT_PIN, payload: { longitude, latitude } });
    }
  };

  const handleDragEnd = ({ lngLat }) => {
    const [longitude, latitude] = lngLat;
    dispatch({ type: UPDATE_DRAFT_PIN, payload: { longitude, latitude } });
  };

  return (
    <Styled.Map>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100vh"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={viewport => setViewport(viewport)}
        onClick={handleMapClick}
      >
        {draftPin && (
          <Marker {...draftPin} draggable={true} onDragEnd={handleDragEnd}>
            <MapPin className="map-pin" />
          </Marker>
        )}
      </ReactMapGL>
      <Styled.NewButton>
        <PlusIcon className="button-icon" />
      </Styled.NewButton>
      <Styled.CreateNew>
        <Styled.NewPinButton>
          <CompassIcon className="button-icon"/>
        </Styled.NewPinButton>
        <Styled.NewPlanButton>
          <PinIcon className="button-icon"/>
        </Styled.NewPlanButton>
      </Styled.CreateNew>
    </Styled.Map>
  );
};

export default Map;
