/* eslint-disable react/prop-types */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_PLANS_ME_QUERY } from '../../graphql/queries';

import * as Styled from './styled';
import { TopbarButton } from '../../sharedStyles/buttons';
import { NoContentFull } from '../../sharedStyles/placeholder';
import { Wrapper } from '../../sharedStyles/wrappers';

import { ReactComponent as PlusIcon } from '../../assets/SVG/plus.svg';
import { ReactComponent as FrownIcon } from '../../assets/SVG/frown.svg';

import Plan from '../../components/Plan';
import Topbar from '../../components/Topbar';
import Loader from '../../components/Loader';

const Plans = ({ history }) => {
  const { loading, data } = useQuery(GET_PLANS_ME_QUERY, {
    fetchPolicy: 'cache-and-network'
  });

  const handleCreate = () => {
    history.push('/create-plan');
  };

  if (loading || !data) return <Loader loading={loading} />;

  return (
    <Wrapper>
      <Topbar>
        <TopbarButton onClick={handleCreate}>
          <PlusIcon className='icon icon-small' />
        </TopbarButton>
      </Topbar>
      <Styled.Plans>
        {data.plans.length === 0 ? (
          <NoContentFull>
            <FrownIcon />
            You have no plans, create one
          </NoContentFull>
        ) : (
          <Styled.PlansList>
            {data.plans.map(plan => (
              <Plan key={plan._id} {...plan} me={data.me} />
            ))}
          </Styled.PlansList>
        )}
      </Styled.Plans>
    </Wrapper>
  );
};

export default Plans;
