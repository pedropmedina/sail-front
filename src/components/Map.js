/* eslint-disable no-console, react/prop-types */
import React, { useState, useContext } from 'react';
import ReactMapGL, {
  GeolocateControl,
  NavigationControl,
  Marker
} from 'react-map-gl';
import { Layout, Icon } from 'antd';

import Context from '../context';

import CreatePin from './Pin/CreatePin';
import ShowPin from './Pin/ShowPin';

const { Content } = Layout;

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
  const [showDrawer, setShowDrawer] = useState(false);

  const Pin = draftPin ? CreatePin : ShowPin;

  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return;
    if (!draftPin) dispatch({ type: 'CREATE_DRAFT_PIN' });
    const [longitude, latitude] = lngLat;
    dispatch({ type: 'UPDATE_DRAFT_PIN', payload: { longitude, latitude } });
    setShowDrawer(true);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
    dispatch({ type: 'DELETE_DRAFT_PIN' });
  };

  return (
    <Content>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="calc(100vh - 64px)"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v10"
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

        {draftPin && (
          <Marker {...draftPin}>
            <Icon
              type="environment"
              theme="filled"
              style={{ fontSize: '32px' }}
            />
          </Marker>
        )}
      </ReactMapGL>

      <Pin showDrawer={showDrawer} onCloseDrawer={handleCloseDrawer} />
    </Content>
  );
};

export default Map;
