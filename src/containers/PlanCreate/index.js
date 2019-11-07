/* eslint-disable no-console, react/prop-types */
import React, { useState, useContext, useEffect } from 'react';
import { Marker } from 'react-map-gl';
import * as yup from 'yup';
import {
  useMutation,
  useApolloClient
} from '@apollo/react-hooks';

import * as Styled from './styled';
import { SaveButton, CancelButton } from '../../sharedStyles/buttons';
import { Fields, Field, Form, Input, Textarea } from '../../sharedStyles/forms';
import { Popup } from '../../stylesShare';

import { ReactComponent as PinIcon } from '../../assets/SVG/map-pin.svg';

import Context from '../../context';
import { useTextarea } from '../../customHooks';

import GeocodingSearch from '../../components/GeocodingSearch';
import DatePicker from '../../components/DatePicker';
import FriendsPicker from '../../components/FriendsPicker';
import MapPreview from '../../components/MapPreview';

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
} from '../../reducer';

import {
  CREATE_PLAN_MUTATION,
  CREATE_REQUEST_MUTATION
} from '../../graphql/mutations';
import { GET_PLANS_QUERY, GET_PIN_BY_COORDS } from '../../graphql/queries';

const css = `
  font-size: 1.6rem;
  background-color: var(--color-less-white);
`;

const mapPreviewCss = `
  height: 100%;
  width: 100%;
`;

const PlanCreate = props => {
  const { state, dispatch } = useContext(Context);
  const { draftPlan, viewport, currentPin } = state;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [dateError, setDateError] = useState('');
  const [invitesError, setInvitesError] = useState('');
  const [createPlan] = useMutation(CREATE_PLAN_MUTATION, {
    ignoreResults: true
  });
  const [createInviteReq] = useMutation(CREATE_REQUEST_MUTATION, {
    ignoreResults: true
  });
  const client = useApolloClient();

  const { rows, handleTextareaChange } = useTextarea();

  useEffect(() => {
    // create draftPlan is none exists upon mounting component
    if (!draftPlan) {
      dispatch({ type: CREATE_DRAFT_PLAN });
    } else {
      draftPlan.title && setTitle(draftPlan.title);
      draftPlan.description && setDescription(draftPlan.description);
    }
  }, []);

  const handleClickGeocodingResult = async result => {
    // resest error field if any
    if (locationError) handleErrors('location');

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
      props.history.push('/map');
    }
  };

  const handleOnSelect = date => {
    dispatch({ type: UPDATE_DRAFT_PLAN, payload: { date } });
    if (dateError) handleErrors('date');
  };

  const handleInvites = invites => {
    dispatch({ type: UPDATE_DRAFT_PLAN, payload: { invites } });
    if (invitesError) handleErrors('invites');
  };

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'description') {
      handleTextareaChange(event);
    }

    const keyedSetters = {
      title: setTitle,
      description: setDescription
    };
    keyedSetters[name](value);
    dispatch({ type: UPDATE_DRAFT_PLAN, payload: { [name]: value } });

    if (name === 'title' && titleError) handleErrors(name);
    if (name === 'description' && descriptionError) handleErrors(name);
  };

  const handleCancel = () => {
    dispatch({ type: DELETE_DRAFT_PLAN });
    dispatch({ type: DELETE_CURRENT_PIN });
    props.history.push('/plans');
  };

  // const handleCancelLocation = () => {
  //   dispatch({ type: DELETE_CURRENT_PIN });
  //   dispatch({
  //     type: UPDATE_DRAFT_PLAN,
  //     payload: { location: '', placeName: '' }
  //   });
  // };

  const handleCreateInviteReq = async (invites, plan) => {
    for (let invite of invites) {
      await createInviteReq({
        variables: { input: { to: invite, reqType: 'INVITE', plan: plan._id } }
      });
    }
  };

  const handleCreatePlan = async () => {
    const validated = await validateFields(draftPlan);
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
    handleCreateInviteReq(invites, data.plan);

    // cleanup store and redirect to /plans
    dispatch({ type: DELETE_CURRENT_PIN });
    dispatch({ type: DELETE_DRAFT_PLAN });
    props.history.push('/plans');
  };

  const validateFields = async (fields = {}) => {
    try {
      const schema = yup.object().shape({
        title: yup.string().required(),
        description: yup.string().required(),
        location: yup.string().required(),
        date: yup.date().required(),
        invites: yup
          .array()
          .of(yup.string())
          .required()
      });
      return await schema.validate(fields, { abortEarly: false });
    } catch (error) {
      for (let e of error.inner) {
        const { message, path } = e;
        handleErrors(path, message);
      }
    }
  };

  const handleErrors = (errorName, errorValue = '') => {
    const keyedErrorSetters = {
      title: setTitleError,
      description: setDescriptionError,
      location: setLocationError,
      date: setDateError,
      invites: setInvitesError
    };
    keyedErrorSetters[errorName](errorValue);
  };

  return (
    <Styled.PlanCreateWrapper>
      <Styled.PlanCreate>
        <Form onSubmit={handleCreatePlan} noValidate>
          <Fields>
            <Field>
              <Input
                type="text"
                name="title"
                value={title}
                placeholder="Title the plan"
                onChange={handleChange}
              />
            </Field>
          </Fields>
          <Fields>
            <Field>
              <Textarea
                rows={rows}
                as="textarea"
                name="description"
                value={description}
                placeholder="Describe your plan to friends"
                onChange={handleChange}
              />
            </Field>
          </Fields>
          <Fields>
            <Field>
              {draftPlan && draftPlan.location && currentPin ? (
                <Styled.MapPreviewWrapper>
                  <MapPreview css={mapPreviewCss} {...viewport}>
                    <Marker
                      longitude={currentPin.longitude}
                      latitude={currentPin.latitude}
                    >
                      <PinIcon className="icon icon-small pin-icon" />
                    </Marker>
                    <Popup
                      longitude={currentPin.longitude}
                      latitude={currentPin.latitude}
                      offsetLeft={24}
                      offsetTop={12}
                      anchor="left"
                      closeButton={false}
                    >
                      <p style={{ width: '20rem' }}>{draftPlan.placeName}</p>
                    </Popup>
                  </MapPreview>
                </Styled.MapPreviewWrapper>
              ) : (
                <GeocodingSearch
                  viewport={viewport}
                  onClickGeocodingResult={handleClickGeocodingResult}
                />
              )}
            </Field>
          </Fields>
          <Fields>
            <Field>
              <DatePicker
                css={css}
                defaultDate={draftPlan ? draftPlan.date : new Date()}
                onSelectDate={handleOnSelect}
              />
            </Field>
          </Fields>
          <Fields>
            <Field>
              <FriendsPicker
                css={css}
                defaultInvites={draftPlan ? draftPlan.invites : []}
                onHandleInvites={handleInvites}
              />
            </Field>
          </Fields>
          <Fields>
            <Field style={{ flex: '0 1 25%' }}>
              <SaveButton>Save</SaveButton>
            </Field>
            <Field style={{ flex: '0 1 25%' }}>
              <CancelButton type="button" onClick={handleCancel}>
                Cancel
              </CancelButton>
            </Field>
          </Fields>
        </Form>
      </Styled.PlanCreate>
    </Styled.PlanCreateWrapper>
  );
};

export default PlanCreate;
