/* eslint-disable no-console, react/prop-types */
import React, { useState, useContext, useEffect } from 'react';
import { Marker } from 'react-map-gl';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';

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
  CREATE_DRAFT_PIN,
  UPDATE_DRAFT_PIN,
  DELETE_DRAFT_PLAN,
  SHOW_DRAFT_PIN_POPUP,
  UPDATE_VIEWPORT,
  UPDATE_CURRENT_PIN,
  DELETE_CURRENT_PIN
} from '../../reducer';

import { CREATE_PLAN_MUTATION } from '../../graphql/mutations';
import { GET_PLANS_QUERY } from '../../graphql/queries';

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
  const { draftPlan, currentUser, pins, viewport, currentPin } = state;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [dateError, setDateError] = useState('');
  const [invitesError, setInvitesError] = useState('');
  const [createPlan] = useMutation(CREATE_PLAN_MUTATION, {
    ignoreResults: true
  });

  useEffect(() => {
    // create draftPlan is none exists upon mounting component
    if (!draftPlan) {
      dispatch({ type: CREATE_DRAFT_PLAN });
    } else {
      draftPlan.title && setTitle(draftPlan.title);
      draftPlan.description && setDescription(draftPlan.description);
    }
  }, []);

  const handleClickGeocodingResult = result => {
    // resest error field if any
    if (locationError) handleErrors('location');

    const [longitude, latitude] = result.center;
    // set data for map preview
    setAddress(result.place_name);
    // update current viewport
    dispatch({
      type: UPDATE_VIEWPORT,
      payload: { longitude, latitude, zoom: 15 }
    });

    // check context for pin with given coordinates
    const pin =
      pins &&
      pins.find(p => p.longitude === longitude && p.latitude === latitude);

    // if pin, simply update plan's location with pin's id
    // else create draft pin, update draft plan and push over to / in order to create new pin
    if (pin) {
      dispatch({ type: UPDATE_DRAFT_PLAN, payload: { location: pin._id } });
      dispatch({ type: UPDATE_CURRENT_PIN, payload: pin });
    } else {
      dispatch({ type: CREATE_DRAFT_PIN });
      dispatch({ type: UPDATE_DRAFT_PIN, payload: { longitude, latitude } });
      dispatch({ type: SHOW_DRAFT_PIN_POPUP, payload: true });
      dispatch({ type: UPDATE_DRAFT_PLAN, payload: { title, description } });
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
    props.history.push('/plans');
  };

  const handleCancelLocation = () => {
    dispatch({ type: DELETE_CURRENT_PIN });
    dispatch({ type: UPDATE_DRAFT_PLAN, payload: { location: '' } });
    setAddress('');
  };

  const handleCreatePlan = async () => {
    const validated = await validateFields(draftPlan);
    if (!validated) return;

    try {
      await createPlan({
        variables: { input: { ...draftPlan } },
        update: (cache, { data: { plan } }) => {
          const { plans } = cache.readQuery({ query: GET_PLANS_QUERY });
          cache.writeQuery({
            query: GET_PLANS_QUERY,
            data: { plans: plans.concat([plan]) }
          });
        }
      });
      props.history.push('/plans');
    } catch (error) {
      console.log(error);
    }
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
                  <p style={{ width: '20rem' }}>{address && address}</p>
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
            friends={currentUser && currentUser.friends}
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
