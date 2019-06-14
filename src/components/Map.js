/* eslint-disable no-console, react/prop-types */
import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import { Layout } from 'antd';

const { Content } = Layout;

const MAPBOX_TOKEN =
  'pk.eyJ1IjoicGVkcm9wbWVkaW5hIiwiYSI6ImNqdzQ1ZHR3dDFiOTk0MHBzNzl1MGhkdjEifQ._BtibRIagOlzgXg1tat1Yg';

const INITIAL_VIEWPORT = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 13
};

const Map = () => {
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);

  const handleMapClick = evt => {
    console.log({ evt });
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
      />
    </Content>
  );
};

export default Map;
