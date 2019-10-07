/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Marker } from 'react-map-gl';
import { format } from 'date-fns';

import * as Styled from './styled';
import { Popup } from '../../stylesShare';

import { ReactComponent as CalendarIcon } from '../../assets/SVG/calendar.svg';
import { ReactComponent as PinIcon } from '../../assets/SVG/map-pin.svg';

import MapPreview from '../MapPreview';

import { reverseGeocode } from '../../utils';

const mapCss = `
  height: 25rem;
`;

const Plan = ({ title, description, date, participants, location }) => {
  const [address, setAddress] = useState('');
  useEffect(() => {
    if (location) {
      const { longitude, latitude } = location;
      (async () => {
        setAddress(await reverseGeocode(longitude, latitude));
      })();
    }
  }, []);

  return (
    <Styled.Plan>
      <Styled.Location>
        <MapPreview
          longitude={location.longitude}
          latitude={location.latitude}
          css={mapCss}
        >
          <Marker longitude={location.longitude} latitude={location.latitude}>
            <PinIcon className="icon icon-small pin-icon" />
          </Marker>
          <Popup
            longitude={location.longitude}
            latitude={location.latitude}
            offsetLeft={24}
            offsetTop={12}
            anchor="left"
            closeButton={false}
          >
            <p style={{ width: '15rem' }}>{address}</p>
          </Popup>
        </MapPreview>
      </Styled.Location>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Description>{description}</Styled.Description>
      <Styled.Date>
        <CalendarIcon className="icon icon-smallest" />{' '}
        {format(new Date(parseInt(date)), 'MMM do, yyyy')}
      </Styled.Date>
      <Styled.Participants>
        {participants.map((participant, i) => (
          <Styled.ParticipantImg
            key={`${participant.email}-${i}`}
            src="https://via.placeholder.com/60"
          />
        ))}
      </Styled.Participants>
    </Styled.Plan>
  );
};

export default Plan;
