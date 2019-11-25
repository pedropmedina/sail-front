/* eslint-disable no-console, react/prop-types */
import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import * as Styled from './styled';
import { Wrapper } from '../../sharedStyles/wrappers';

import PlanForm from '../../components/PlanForm';

import { GET_PLAN_QUERY } from '../../graphql/queries';
import {
  UPDATE_PLAN_MUTATION,
  CREATE_REQUEST_MUTATION,
  DELETE_REQUEST_MUTATION
} from '../../graphql/mutations';

const PlanEdit = props => {
  const { error, loading, data } = useQuery(GET_PLAN_QUERY, {
    variables: { planId: props.match.params.planId }
  });
  const [updatePlan, { loading: updatePlanLoading }] = useMutation(
    UPDATE_PLAN_MUTATION
  );
  const [createInviteReq] = useMutation(CREATE_REQUEST_MUTATION, {
    ignoreResults: true
  });
  const [deleteInviteReq] = useMutation(DELETE_REQUEST_MUTATION, {
    ignoreResults: true
  });

  const createInvites = async (invites, plan) => {
    for (let invite of invites) {
      await createInviteReq({
        variables: { input: { to: invite, reqType: 'INVITE', plan: plan._id } }
      });
    }
  };

  const deleteInvites = async invites => {
    for (let invite of invites) {
      await deleteInviteReq({ variables: { reqId: invite._id } });
    }
  };

  const manageInvitesReq = (prevInvites, currInvites) => {
    const createList = currInvites.filter(
      invite => prevInvites.indexOf(invite) < 0
    );
    const deleteList = prevInvites.filter(
      invite => currInvites.indexOf(invite) < 0
    );
    createInvites(createList, data.plan);
    deleteInvites(deleteList);
  };

  const extractUsername = invites => invites.map(invite => invite.username);

  const handleSave = async draftPlan => {
    const planId = props.match.params.planId;
    const { title, description, location, date, invites } = draftPlan;

    await updatePlan({
      variables: {
        input: { planId, title, description, location, date, invites }
      }
    });

    manageInvitesReq(extractUsername(data.plan.invites), invites);

    props.history.push('/plans');
  };

  if (!error && (loading || !data)) return <div>Loading...</div>;

  return (
    <Wrapper>
      <Styled.PlanEdit>
        <PlanForm
          loading={updatePlanLoading}
          handleSave={handleSave}
          defaultDraftPlan={data.plan}
        />
      </Styled.PlanEdit>
    </Wrapper>
  );
};

export default PlanEdit;

// update: (cache, { data: { plan } }) => {
//   const { plans } = cache.readQuery({ query: GET_PLANS_QUERY });
//   cache.writeQuery({
//     query: GET_PLANS_QUERY,
//     data: { plans: plans.concat([plan]) }
//   });
// }
