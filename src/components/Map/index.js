/* eslint-disable no-console, react/prop-types */
import React, { useState, useContext } from 'react';
import ReactMapGL, { GeolocateControl, NavigationControl } from 'react-map-gl';

import * as Styled from './styled';
import Context from '../../context';

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
    if (!draftPin) dispatch({ type: 'CREATE_DRAFT_PIN' });
    const [longitude, latitude] = lngLat;
    dispatch({ type: 'UPDATE_DRAFT_PIN', payload: { longitude, latitude } });
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
        <div className="controls">
          <GeolocateControl
            className="controls-geolocate"
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
          <NavigationControl />
        </div>
      </ReactMapGL>
    </Styled.Map>
  );
};

export default Map;
