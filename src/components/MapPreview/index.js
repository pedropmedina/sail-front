/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components/macro'; // eslint-disable-line
import { StaticMap, Marker } from 'react-map-gl';

import * as Styled from './styled';
import { Popup } from '../../sharedStyles/popup';
import { RoundButton } from '../../sharedStyles/buttons';

import { ReactComponent as PinIcon } from '../../assets/SVG/map-pin.svg';
import { ReactComponent as EditIcon } from '../../assets/SVG/edit-3.svg';

const MapPreview = ({
  children,
  css = '',
  longitude = -122.4376,
  latitude = 37.7577,
  zoom = 13,
  name,
  showEditButton = false,
  onEditMap
}) => {
  return (
    <Styled.MapPreview css={css}>
      {showEditButton && onEditMap && (
        <RoundButton
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            zIndex: 1
          }}
          type="button"
          onClick={onEditMap}
        >
          <EditIcon />
        </RoundButton>
      )}
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
          <p style={{ width: '15rem' }}>{name}</p>
        </Popup>
        {children}
      </StaticMap>
    </Styled.MapPreview>
  );
};

export default MapPreview;
