import { useEffect, useContext } from 'react';
import Context from '../context';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import * as yup from 'yup';

import history from '../history';

import { useForm } from './useForm';
import { useTextarea } from './useTextarea';

import {
  CREATE_DRAFT_PLAN,
  UPDATE_DRAFT_PLAN,
  DELETE_DRAFT_PLAN,
  SHOW_DRAFT_PIN_POPUP,
  UPDATE_VIEWPORT,
  UPDATE_CURRENT_PIN,
  DELETE_CURRENT_PIN,
  CREATE_DRAFT_PIN_POPUP,
  UPDATE_DRAFT_PIN_POPUP
} from '../reducer';

import {
  CREATE_PLAN_MUTATION,
  CREATE_REQUEST_MUTATION
} from '../graphql/mutations';
import { GET_PLANS_QUERY, GET_PIN_BY_COORDS } from '../graphql/queries';

export const usePlan = () => {
  const client = useApolloClient();
  const { state, dispatch } = useContext(Context);
  const { draftPlan } = state;
  const [createPlan, { loading }] = useMutation(CREATE_PLAN_MUTATION);
  const [createInviteReq] = useMutation(CREATE_REQUEST_MUTATION, {
    ignoreResults: true
  });

  const {
    inputs,
    errors,
    handleChangeInputs,
    handleSetInput,
    handleSetError,
    handleValidateFields
  } = useForm({
    title: '',
    description: ''
  });
  const { rows: descriptionRows, handleTextareaChange } = useTextarea();

  // create draftPlan is none exists upon mounting component
  useEffect(() => {
    if (!draftPlan) {
      dispatch({ type: CREATE_DRAFT_PLAN });
    } else {
      draftPlan.title && handleSetInput('title', draftPlan.title);
      draftPlan.description &&
        handleSetInput('description', draftPlan.description);
    }
  }, []);

  const handleSelectGeocoding = async result => {
    const [longitude, latitude] = result.center;

    // update current viewport
    dispatch({
      type: UPDATE_VIEWPORT,
      payload: { longitude, latitude, zoom: 15 }
    });

    // check for existing pin with given coordinates
    const { data } = await client.query({
      query: GET_PIN_BY_COORDS,
      variables: { input: { longitude, latitude } }
    });

    // if pin, simply update plan's location with pin's id
    // else create draftPinPopup, update draft plan and push over to / in order to create new pin
    if (data && data.pin) {
      dispatch({
        type: UPDATE_DRAFT_PLAN,
        payload: { location: data.pin._id, placeName: result.place_name }
      });
      dispatch({ type: UPDATE_CURRENT_PIN, payload: data.pin });
    } else {
      const { title, description } = inputs;
      dispatch({
        type: UPDATE_DRAFT_PLAN,
        payload: { title, description, placeName: result.place_name }
      });
      dispatch({ type: CREATE_DRAFT_PIN_POPUP });
      dispatch({
        type: UPDATE_DRAFT_PIN_POPUP,
        payload: { longitude, latitude }
      });
      dispatch({ type: SHOW_DRAFT_PIN_POPUP, payload: true });
      history.push('/map');
    }
  };

  const handleSelectDate = date => {
    dispatch({ type: UPDATE_DRAFT_PLAN, payload: { date } });
  };

  const handleInvites = invites => {
    const invitesUsername = invites.map(invite => invite.username);
    dispatch({
      type: UPDATE_DRAFT_PLAN,
      payload: { invites: invitesUsername }
    });
  };

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    // reset error
    if (errors[name]) handleSetError(name, '');

    handleChangeInputs(event);

    if (event.target.name === 'description') {
      handleTextareaChange(event);
    }

    dispatch({ type: UPDATE_DRAFT_PLAN, payload: { [name]: value } });
  };

  const handleCancelPlan = () => {
    dispatch({ type: DELETE_DRAFT_PLAN });
    dispatch({ type: DELETE_CURRENT_PIN });
    history.push('/plans');
  };

  const handleCancelLocation = () => {
    dispatch({ type: DELETE_CURRENT_PIN });
    dispatch({
      type: UPDATE_DRAFT_PLAN,
      payload: { location: '', placeName: '' }
    });
  };

  const handleCreatePlan = async event => {
    event.preventDefault();

    // validate form before submisssion
    const schema = yup.object().shape({
      title: yup.string().required(),
      description: yup.string().required(),
      date: yup.date().required(),
      invites: yup
        .array()
        .of(yup.string())
        .required()
    });
    const validated = await handleValidateFields(schema, draftPlan);
    if (!validated) return;

    // destructure draft plan to get data needed for creating of plan
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
    _createInvites(invites, data.plan);

    // cleanup store and redirect to /plans
    dispatch({ type: DELETE_CURRENT_PIN });
    dispatch({ type: DELETE_DRAFT_PLAN });
    history.push('/plans');
  };

  const _createInvites = async (invites, plan) => {
    for (let invite of invites) {
      await createInviteReq({
        variables: { input: { to: invite, reqType: 'INVITE', plan: plan._id } }
      });
    }
  };

  return {
    inputs,
    descriptionRows,
    loading,
    errors,
    handleChange,
    handleCreatePlan,
    handleCancelPlan,
    handleCancelLocation,
    handleInvites,
    handleSelectDate,
    handleSelectGeocoding
  };
};
