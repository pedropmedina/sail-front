/* eslint-disable no-console, react/prop-types */
import React, { useState, useContext, useEffect } from 'react';
import { Marker } from 'react-map-gl';
import * as yup from 'yup';

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
  };

  const handleInvites = invites => {
    dispatch({ type: UPDATE_DRAFT_PLAN, payload: { invites } });
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
  };

  const handleCancel = () => {
    dispatch({ type: DELETE_DRAFT_PLAN });
    props.history.push('/plans');
  };

  const handleCancelLocation = () => {
    dispatch({ type: DELETE_CURRENT_PIN });
    setAddress('');
  };

  const handleCreatePlan = () => {
    validateFields(draftPlan);
  };

  // TODO: implement error validation messages
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
      console.log(error);
    }
  };

  return (
    <Styled.PlanCreate>
      <Styled.Fields>
        <Styled.Field>
          <Styled.Input
            type="text"
            name="title"
            value={title}
            placeholder="Title the plan"
            onChange={handleChange}
          />
        </Styled.Field>
        <Styled.Field>
          <Styled.Input
            type="text"
            name="description"
            value={description}
            placeholder="Describe your plan to friends."
            onChange={handleChange}
          />
        </Styled.Field>
        <Styled.Field>
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
        </Styled.Field>
        <Styled.Field>
          <DatePicker
            css={css}
            defaultDate={draftPlan ? draftPlan.date : new Date()}
            onSelectDate={handleOnSelect}
          />
        </Styled.Field>
        <Styled.Field>
          <FriendsPicker
            css={css}
            friends={currentUser && currentUser.friends}
            defaultInvites={draftPlan ? draftPlan.invites : []}
            onHandleInvites={handleInvites}
          />
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
