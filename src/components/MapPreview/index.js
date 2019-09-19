/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components/macro'; // eslint-disable-line
import { StaticMap } from 'react-map-gl';

import * as Styled from './styled';

const MapPreview = ({
  children,
  css = '',
  longitude = -122.4376,
  latitude = 37.7577,
  zoom = 13
}) => {
  return (
    <Styled.MapPreview css={css}>
      <StaticMap
        mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v9"
        width="100%"
        height="100%"
        longitude={longitude}
        latitude={latitude}
        zoom={zoom}
      >
        {children}
      </StaticMap>
    </Styled.MapPreview>
  );
};

export default MapPreview;
