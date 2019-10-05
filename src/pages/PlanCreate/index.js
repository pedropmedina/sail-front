/* eslint-disable no-console, react/prop-types */
import React, { useState, useContext, useEffect } from 'react';
import { Marker } from 'react-map-gl';
import * as yup from 'yup';
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks';

import * as Styled from './styled';

import { ReactComponent as PlusIcon } from '../../assets/SVG/plus.svg';
import { ReactComponent as XIcon } from '../../assets/SVG/x.svg';
import { ReactComponent as PinIcon } from '../../assets/SVG/map-pin.svg';
import { ReactComponent as TrashIcon } from '../../assets/SVG/trash.svg';

import Context from '../../context';

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

import { ME_QUERY } from '../../graphql/queries';
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
  const { error, loading, data } = useQuery(ME_QUERY);

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
      props.history.push('/');
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

  const handleCancelLocation = () => {
    dispatch({ type: DELETE_CURRENT_PIN });
    dispatch({
      type: UPDATE_DRAFT_PLAN,
      payload: { location: '', placeName: '' }
    });
  };

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

  if (!error && loading) return <div>Loading...</div>;

  return (
    <Styled.PlanCreate>
      <Styled.Fields>
        <Styled.Field error={titleError}>
          <Styled.Input
            type="text"
            name="title"
            value={title}
            placeholder="Title the plan"
            onChange={handleChange}
          />
          {titleError && <Styled.FieldError>{titleError}</Styled.FieldError>}
        </Styled.Field>
        <Styled.Field error={descriptionError}>
          <Styled.Input
            type="text"
            name="description"
            value={description}
            placeholder="Describe your plan to friends."
            onChange={handleChange}
          />
          {descriptionError && (
            <Styled.FieldError>{descriptionError}</Styled.FieldError>
          )}
        </Styled.Field>
        <Styled.Field error={locationError}>
          {draftPlan && draftPlan.location && currentPin ? (
            <Styled.MapPreviewWrapper>
              <MapPreview css={mapPreviewCss} {...viewport}>
                <Marker
                  longitude={currentPin.longitude}
                  latitude={currentPin.latitude}
                >
                  <PinIcon className="icon icon-small pin-icon" />
                </Marker>
                <Styled.MapPreviewPopup
                  longitude={currentPin.longitude}
                  latitude={currentPin.latitude}
                  offsetLeft={24}
                  offsetTop={12}
                  anchor="left"
                  closeButton={false}
                >
                  <p style={{ width: '20rem' }}>{draftPlan.placeName}</p>
                </Styled.MapPreviewPopup>
              </MapPreview>
              <Styled.CancelLocationBtn onClick={handleCancelLocation}>
                <TrashIcon className="icon icon-small" />
              </Styled.CancelLocationBtn>
            </Styled.MapPreviewWrapper>
          ) : (
            <GeocodingSearch
              viewport={viewport}
              onClickGeocodingResult={handleClickGeocodingResult}
              css={css}
            />
          )}
          {locationError && (
            <Styled.FieldError>{locationError}</Styled.FieldError>
          )}
        </Styled.Field>
        <Styled.Field error={dateError}>
          <DatePicker
            css={css}
            defaultDate={draftPlan ? draftPlan.date : new Date()}
            onSelectDate={handleOnSelect}
          />
          {dateError && <Styled.FieldError>{dateError}</Styled.FieldError>}
        </Styled.Field>
        <Styled.Field error={invitesError}>
          <FriendsPicker
            css={css}
            friends={data.user.friends}
            defaultInvites={draftPlan ? draftPlan.invites : []}
            onHandleInvites={handleInvites}
          />
          {invitesError && (
            <Styled.FieldError>{invitesError}</Styled.FieldError>
          )}
        </Styled.Field>
        <Styled.CreateBtn onClick={handleCreatePlan}>
          <PlusIcon />
          Create Plan
        </Styled.CreateBtn>
        <Styled.CancelBtn onClick={handleCancel}>
          <XIcon />
        </Styled.CancelBtn>
      </Styled.Fields>
    </Styled.PlanCreate>
  );
};

export default PlanCreate;
