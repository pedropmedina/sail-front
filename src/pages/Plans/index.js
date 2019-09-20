/* eslint-disable react/prop-types */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_PLANS_QUERY } from '../../graphql/queries';

import * as Styled from './styled';
import Plan from '../../components/Plan';
import Topbar from '../../components/Topbar';

const Plans = ({ history }) => {
  const { error, loading, data } = useQuery(GET_PLANS_QUERY);

  if (!error && loading) return <div>Loading....</div>;

  return (
    <Styled.PlansWrapper>
      <Topbar history={history} />
      <Styled.Plans>
        {data && data.plans.map(plan => <Plan key={plan.id} {...plan} />)}
      </Styled.Plans>
    </Styled.PlansWrapper>
  );
};

export default Plans;
