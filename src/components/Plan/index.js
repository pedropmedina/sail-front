/* eslint-disable react/prop-types */
import React from 'react';
import { format } from 'date-fns';
import Avatar from 'react-user-avatar';

import * as Styled from './styled';

import { ReactComponent as CalendarIcon } from '../../assets/SVG/calendar.svg';

import MapPreview from '../MapPreview';

import { useReverseGeocode } from '../../customHooks';

const mapCss = `
  height: 25rem;
`;

const Plan = ({ _id, title, description, date, participants, location }) => {
  const { longitude: lon, latitude: lat } = location;
  const { reversedGeocode, longitude, latitude } = useReverseGeocode(lon, lat);

  return (
    <Styled.Plan>
      <Styled.PlanLink to={`/plan/${_id}`}>
        <Styled.Location>
          <MapPreview
            longitude={longitude}
            latitude={latitude}
            reversedGeocode={reversedGeocode}
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
          {participants.map(
            participant =>
              (
                <Avatar
                  key={participant.email}
                  size="60"
                  name={participant.firstName}
                  src={participant.image}
                />
              )
          )}
        </Styled.Participants>
      </Styled.PlanLink>
    </Styled.Plan>
  );
};

export default Plan;
