/* eslint-disable no-console, react/prop-types */
import React, { useState, useContext } from 'react';

import * as Styled from './styled';

import Context from '../../context';
import GeocodingSearch from '../../components/GeocodingSearch';
import DatePicker from '../../components/DatePicker';
import FriendsPicker from '../../components/FriendsPicker';

const css = `
  font-size: 1.6rem;
  background-color: var(--color-less-white);
`;

const PlanCreate = () => {
  const { state } = useContext(Context);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleClickGeocodingResult = result => {
    console.log(result);
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
          <DatePicker />
        </Styled.Field>
        <Styled.Field>
          <FriendsPicker />
        </Styled.Field>
      </Styled.Fields>
    </Styled.PlanCreate>
  );
};

export default PlanCreate;
