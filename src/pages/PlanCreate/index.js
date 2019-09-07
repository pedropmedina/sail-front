/* eslint-disable no-console, react/prop-types */
import React, { useContext } from 'react';

import * as Styled from './styled';

import Context from '../../context';
import GeocodingSearch from '../../components/GeocodingSearch';

const css = `
  font-size: 1.6rem;
  background-color: var(--color-less-white);
`;

const PlanCreate = () => {
  const { state } = useContext(Context);

  const handleClickGeocodingResult = result => {
    console.log(result);
  };

  return (
    <Styled.PlanCreate>
      <Styled.Fields>
        <Styled.Field>
          <Styled.Input type="text" name="title" placeholder="Title the plan" />
        </Styled.Field>
        <Styled.Field>
          <Styled.Input
            type="text"
            name="description"
            placeholder="Describe your plan to friends."
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
          <Styled.Input type="text" name="date" placeholder="Select a date" />
        </Styled.Field>
      </Styled.Fields>
    </Styled.PlanCreate>
  );
};

export default PlanCreate;
