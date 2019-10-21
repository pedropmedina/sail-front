/* eslint-disable react/prop-types */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_PLANS_QUERY } from '../../graphql/queries';

import * as Styled from './styled';
import { CreateBtn } from '../../stylesShare';

import { ReactComponent as PlusIcon } from '../../assets/SVG/plus.svg';

import Plan from '../../components/Plan';
import Topbar from '../../components/Topbar';

const Plans = ({ history }) => {
  const { error, loading, data } = useQuery(GET_PLANS_QUERY);

  const handleCreate = () => {
    history.push('/create-plan');
  };

  if (!error && loading) return <div>Loading....</div>;

  return (
    <Styled.PlansWrapper>
      <Topbar>
        <CreateBtn onClick={handleCreate}>
          <PlusIcon className="icon icon-small" />
        </CreateBtn>
      </Topbar>
      <Styled.Plans>
        {data &&
          data.plans &&
          data.plans.map(plan => <Plan key={plan._id} {...plan} />)}
      </Styled.Plans>
    </Styled.PlansWrapper>
  );
};

export default Plans;
