/* eslint-disable no-console, react/prop-types */
import React, { useState, useContext, useEffect } from 'react';
// import * as yup from 'yup';

import * as Styled from './styled';

import { ReactComponent as PlusIcon } from '../../assets/SVG/plus.svg';
import { ReactComponent as XIcon } from '../../assets/SVG/x.svg';

import Context from '../../context';

import GeocodingSearch from '../../components/GeocodingSearch';
import DatePicker from '../../components/DatePicker';
import FriendsPicker from '../../components/FriendsPicker';

import {
  CREATE_DRAFT_PLAN,
  UPDATE_DRAFT_PLAN,
  CREATE_DRAFT_PIN,
  UPDATE_DRAFT_PIN,
  DELETE_DRAFT_PLAN
} from '../../reducer';

const css = `
  font-size: 1.6rem;
  background-color: var(--color-less-white);
`;

const PlanCreate = props => {
  const { state, dispatch } = useContext(Context);
  const { draftPlan, currentUser, pins, viewport } = state;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // create draftPlan is none exists
    if (!draftPlan) {
      dispatch({ type: CREATE_DRAFT_PLAN });
    } else {
      draftPlan.title && setTitle(draftPlan.title);
      draftPlan.description && setDescription(draftPlan.description);
    }
  }, []);

  const handleClickGeocodingResult = result => {
    const [longitude, latitude] = result.center;
    // check context for pin with given coordinates
    const pin =
      pins &&
      pins.find(p => p.longitude === longitude && p.latitude === latitude);
    //
    if (pin) {
      dispatch({ type: UPDATE_DRAFT_PLAN, payload: { location: pin._id } });
    } else {
      dispatch({ type: CREATE_DRAFT_PIN });
      dispatch({
        type: UPDATE_DRAFT_PIN,
        payload: { longitude, latitude, zoom: 13 }
      });
      dispatch({ type: CREATE_DRAFT_PLAN });
      dispatch({ type: UPDATE_DRAFT_PLAN, payload: { title, description } });
      console.log(result);
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
          <GeocodingSearch
            viewport={viewport}
            onClickGeocodingResult={handleClickGeocodingResult}
            css={css}
          />
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
        <Styled.CreateBtn>
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
