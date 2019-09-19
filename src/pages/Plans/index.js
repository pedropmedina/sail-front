/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import context from '../../context';
import { PLAN_CREATED } from '../../reducer';
import { GET_PLANS_QUERY } from '../../graphql/queries';

import * as Styled from './styled';
import Plan from '../../components/Plan';
import Topbar from '../../components/Topbar';

const Plans = ({ history }) => {
  const { state, dispatch } = useContext(context);
  const { error, loading, data } = useQuery(GET_PLANS_QUERY);

  if (loading) return <div>Loading....</div>;
  if (data) console.log({ data });

  return (
    <Styled.PlansWrapper>
      <Topbar history={history} />
      <Styled.Plans>
        <Plan />
      </Styled.Plans>
    </Styled.PlansWrapper>
  );
};

export default Plans;
