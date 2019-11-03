/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components/macro'; // eslint-disable-line
import { StaticMap, Marker } from 'react-map-gl';

import * as Styled from './styled';
import { Popup } from '../../sharedStyles/popup';

import { ReactComponent as PinIcon } from '../../assets/SVG/map-pin.svg';

const MapPreview = ({
  children,
  css = '',
  longitude = -122.4376,
  latitude = 37.7577,
  zoom = 13,
  reversedGeocode
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
        <Marker longitude={longitude} latitude={latitude}>
          <PinIcon className="icon icon-small pin-icon" />
        </Marker>
        <Popup
          longitude={longitude}
          latitude={latitude}
          offsetLeft={24}
          offsetTop={12}
          anchor="left"
          closeButton={false}
        >
          <p style={{ width: '15rem' }}>{reversedGeocode}</p>
        </Popup>
        {children}
      </StaticMap>
    </Styled.MapPreview>
  );
};

export default MapPreview;
