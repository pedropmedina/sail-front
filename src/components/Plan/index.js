/* eslint-disable react/prop-types */
import React from 'react';
import { format } from 'date-fns';
import Avatar from 'react-user-avatar';

import * as Styled from './styled';

import { ReactComponent as CalendarIcon } from '../../assets/SVG/calendar.svg';

import MapPreview from '../MapPreview';

import { useReverseGeocode, useColors } from '../../customHooks';

const mapCss = `
  height: 25rem;
`;

const Plan = ({ _id, title, description, date, participants, location }) => {
  const { longitude: lon, latitude: lat } = location;
  const { name, longitude, latitude } = useReverseGeocode(lon, lat);
  const { colors } = useColors();

  return (
    <Styled.Plan>
      <Styled.PlanLink to={`/plan/${_id}`}>
        <Styled.Location>
          <MapPreview
            longitude={longitude}
            latitude={latitude}
            name={name}
            css={mapCss}
          />
        </Styled.Location>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Description>{description}</Styled.Description>
        <Styled.Date>
          <CalendarIcon className="icon icon-smallest" />{' '}
          {format(new Date(parseInt(date)), 'MMM do, yyyy')}
        </Styled.Date>
        <Styled.Participants>
          {participants.map(participant => (
            <Avatar
              key={participant.email}
              size="60"
              name={participant.firstName}
              src={participant.image}
              colors={colors}
            />
          ))}
        </Styled.Participants>
      </Styled.PlanLink>
    </Styled.Plan>
  );
};

export default Plan;
