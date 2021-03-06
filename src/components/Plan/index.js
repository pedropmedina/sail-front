/* eslint-disable react/prop-types */
import React from 'react';
import { format } from 'date-fns';
import Avatar from 'react-user-avatar';
import { useMutation } from '@apollo/react-hooks';

import * as Styled from './styled';
import { DefaultLink } from '../../sharedStyles/links';

import { ReactComponent as CalendarIcon } from '../../assets/SVG/calendar.svg';
import { ReactComponent as TrashIcon } from '../../assets/SVG/trash.svg';
import { ReactComponent as ArrowUpRightIcon } from '../../assets/SVG/arrow-up-right.svg';

import MapPreview from '../MapPreview';

import { useReverseGeocode, useColors } from '../../hooks';

import { DELETE_PLAN_MUTATION } from '../../graphql/mutations';
import { GET_PLANS_QUERY } from '../../graphql/queries';

const mapCss = `
  height: 25rem;
`;

const Plan = ({
  _id,
  title,
  description,
  date,
  participants,
  location,
  author,
  me
}) => {
  const { longitude: lon, latitude: lat } = location;
  const { name, longitude, latitude } = useReverseGeocode(lon, lat);
  const { colors } = useColors();
  const [deletePlan] = useMutation(DELETE_PLAN_MUTATION);

  const handleDeletePlan = (event, planId) => {
    event.stopPropagation();
    deletePlan({
      variables: { planId },
      update: cache => {
        const { plans } = cache.readQuery({ query: GET_PLANS_QUERY });
        cache.writeQuery({
          query: GET_PLANS_QUERY,
          data: { plans: plans.filter(plan => plan._id !== _id) }
        });
      }
    });
  };

  const isAuthor = (username1, username2) => username1 === username2;

  return (
    <Styled.Plan>
      <Styled.Location>
        <MapPreview
          longitude={longitude}
          latitude={latitude}
          name={name}
          css={mapCss}
        />
      </Styled.Location>
      <DefaultLink to={`/plan/${_id}`}>
        <Styled.Title>{title}</Styled.Title>
        <ArrowUpRightIcon />
      </DefaultLink>
      <Styled.Description>{description}</Styled.Description>
      <Styled.Date>
        <CalendarIcon />
        {format(new Date(parseInt(date)), 'MMM do, yyyy')}
      </Styled.Date>
      <Styled.Footer>
        <Styled.Participants>
          {participants.map(participant => (
            <Avatar
              key={participant.email}
              size='60'
              name={participant.fullName}
              src={participant.image}
              colors={colors}
            />
          ))}
        </Styled.Participants>
        <Styled.ActionButtons>
          {isAuthor(me.username, author.username) && (
            <Styled.ActionButtonDelete
              onClick={event => handleDeletePlan(event, _id)}
            >
              <TrashIcon />
            </Styled.ActionButtonDelete>
          )}
        </Styled.ActionButtons>
      </Styled.Footer>
    </Styled.Plan>
  );
};

export default Plan;
