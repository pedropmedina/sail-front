/* eslint-disable no-console, react/prop-types */
import React, { useState, useContext } from 'react';
// import * as yup from 'yup';

import * as Styled from './styled';

import { ReactComponent as PlusIcon } from '../../assets/SVG/plus.svg';
import { ReactComponent as XIcon } from '../../assets/SVG/x.svg';

import Context from '../../context';

import GeocodingSearch from '../../components/GeocodingSearch';
import DatePicker from '../../components/DatePicker';
import FriendsPicker from '../../components/FriendsPicker';

const css = `
  font-size: 1.6rem;
  background-color: var(--color-less-white);
`;

const PlanCreate = props => {
  const { state } = useContext(Context);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleClickGeocodingResult = result => {
    console.log(result);
  };

  const handleOnSelect = date => {
    console.log(date);
  };

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    const keyedSetters = {
      title: setTitle,
      description: setDescription
    };
    keyedSetters[name](value);
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
            viewport={state.viewport}
            onClickGeocodingResult={handleClickGeocodingResult}
            css={css}
          />
        </Styled.Field>
        <Styled.Field>
          <DatePicker onSelectDate={handleOnSelect} css={css} />
        </Styled.Field>
        <Styled.Field>
          <FriendsPicker
            css={css}
            friends={state && state.currentUser && state.currentUser.friends}
          />
        </Styled.Field>
        <Styled.CreateBtn>
          <PlusIcon />
          Create Plan
        </Styled.CreateBtn>
        <Styled.CancelBtn onClick={() => props.history.push('/plans')}>
          <XIcon />
        </Styled.CancelBtn>
      </Styled.Fields>
    </Styled.PlanCreate>
  );
};

export default PlanCreate;
