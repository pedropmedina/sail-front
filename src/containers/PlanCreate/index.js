/* eslint-disable no-console, react/prop-types */
import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import * as Styled from './styled';
import { Wrapper } from '../../sharedStyles/wrappers';

import PlanForm from '../../components/PlanForm';

import {
  CREATE_PLAN_MUTATION,
  CREATE_REQUEST_MUTATION
} from '../../graphql/mutations';
import { GET_PLANS_QUERY } from '../../graphql/queries';

const PlanCreate = props => {
  const [createPlan, { loading }] = useMutation(CREATE_PLAN_MUTATION);
  const [createInviteReq] = useMutation(CREATE_REQUEST_MUTATION, {
    ignoreResults: true
  });

  const createInvites = async (invites, plan) => {
    for (let invite of invites) {
      await createInviteReq({
        variables: { input: { to: invite, reqType: 'INVITE', plan: plan._id } }
      });
    }
  };

  const handleSave = async draftPlan => {
    const { title, description, location, date, invites } = draftPlan;

    const { data } = await createPlan({
      variables: { input: { title, description, location, date, invites } },
      update: (cache, { data: { plan } }) => {
        const { plans } = cache.readQuery({ query: GET_PLANS_QUERY });
        cache.writeQuery({
          query: GET_PLANS_QUERY,
          data: { plans: plans.concat([plan]) }
        });
      }
    });

    // create requests
    createInvites(invites, data.plan);

    props.history.push('/plans');
  };

  return (
    <Wrapper>
      <Styled.PlanCreate>
        <PlanForm loading={loading} handleSave={handleSave} />
      </Styled.PlanCreate>
    </Wrapper>
  );
};

export default PlanCreate;
