/* eslint-disable react/prop-types */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ClipLoader } from 'react-spinners';

import { GET_PLANS_QUERY } from '../../graphql/queries';

import * as Styled from './styled';
import { TopbarButton } from '../../sharedStyles/buttons';
import { Spinner, NoContentFull } from '../../sharedStyles/placeholder';
import { Wrapper } from '../../sharedStyles/wrappers';

import { ReactComponent as PlusIcon } from '../../assets/SVG/plus.svg';
import { ReactComponent as FrownIcon } from '../../assets/SVG/frown.svg';

import Plan from '../../components/Plan';
import Topbar from '../../components/Topbar';

const Plans = ({ history }) => {
  const { loading, data } = useQuery(GET_PLANS_QUERY);

  const handleCreate = () => {
    history.push('/create-plan');
  };

  return (
    <Wrapper>
      <Topbar>
        <TopbarButton onClick={handleCreate}>
          <PlusIcon className='icon icon-small' />
        </TopbarButton>
      </Topbar>
      <Styled.Plans>
        {loading && !data ? (
          <Spinner>
            <ClipLoader
              sizeUnit={'rem'}
              size={4}
              color={'#6C8C96'}
              loading={loading && !data}
            />
          </Spinner>
        ) : data && data.plans && data.plans.length === 0 ? (
          <NoContentFull>
            <FrownIcon />
            You have no plans, create one
          </NoContentFull>
        ) : (
          <Styled.PlansList>
            {data &&
              data.plans &&
              data.plans.map(plan => <Plan key={plan._id} {...plan} />)}
          </Styled.PlansList>
        )}
      </Styled.Plans>
    </Wrapper>
  );
};

export default Plans;
