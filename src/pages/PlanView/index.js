/* eslint-disable react/prop-types */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import * as Styled from './styled';

import MapPreview from '../../components/MapPreview';

import { GET_PLAN_QUERY } from '../../graphql/queries';

const mapCss = `
  height: 25rem;
`;

const PlanView = props => {
  const { error, loading, data } = useQuery(GET_PLAN_QUERY, {
    variables: { planId: props.match.params.planId }
  });

  if (!error && loading) return <div>Loading...</div>;
  console.log({ data });
  return (
    <Styled.PlanViewWrapper>
      <Styled.MapPreview>
        <MapPreview css={mapCss} />
      </Styled.MapPreview>
      <Styled.Title>Title</Styled.Title>
      <Styled.Description>Description</Styled.Description>
      <Styled.Date>Current Date Here</Styled.Date>
      <Styled.UserList>
        <Styled.UserItem>User 1</Styled.UserItem>
      </Styled.UserList>
    </Styled.PlanViewWrapper>
  );
};

export default PlanView;
