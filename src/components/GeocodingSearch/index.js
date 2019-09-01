/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import * as Styled from './styled';
import SearchIcon from '../../assets/SVG/search.svg';

const GeocodingSearch = ({ onForwardGeocode }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    let timeout = undefined;
    if (text) {
      // clear previous timeout
      clearTimeout(timeout);
      // set new timeout
      timeout = setTimeout(() => onForwardGeocode(text), 400);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [text]);

  const handleChange = e => {
    const value = e.target.value;
    setText(value);
  };

  const hanldeSubmit = e => {
    e.preventDefault();
  };

  return (
    <Styled.GeocodingSearch>
      <Styled.GeocodingForm onSubmit={hanldeSubmit}>
        <Styled.GeocodingInput
          type="text"
          value={text}
          placeholder="Search by location, category, city..."
          onChange={handleChange}
        />
        <Styled.SearchBtn>
          <SearchIcon className="icon icon-small" />
        </Styled.SearchBtn>
      </Styled.GeocodingForm>
    </Styled.GeocodingSearch>
  );
};

export default GeocodingSearch;
