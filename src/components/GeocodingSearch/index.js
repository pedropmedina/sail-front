/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

import * as Styled from './styled';
import SearchIcon from '../../assets/SVG/search.svg';

// Initialize mapbox geocoding service
const geocondingService = mbxGeocoding({
  accessToken: process.env.MAPBOX_TOKEN
});

const DEFAULT_VIEWPORT = {
  longitude: -122.4376,
  latitude: 37.7577
};

const GeocodingSearch = ({ viewport = DEFAULT_VIEWPORT }) => {
  const [text, setText] = useState('');
  const [geocodingResults, setGeocodingResults] = useState([]);

  useEffect(() => {
    let timeout = undefined;
    if (text) {
      // clear previous timeout
      clearTimeout(timeout);
      // set new timeout
      timeout = setTimeout(() => handleForwardGeocode(text), 400);
    } else {
      setGeocodingResults([]);
    }

    // clear any timeout on unmount
    return () => {
      clearTimeout(timeout);
    };
  }, [text]);

  const handleChange = e => {
    const value = e.target.value;
    setText(value);
  };

  const handleForwardGeocode = async searchText => {
    const { body } = await geocondingService
      .forwardGeocode({
        query: searchText,
        limit: 5,
        proximity: [viewport.longitude, viewport.latitude]
      })
      .send();
    setGeocodingResults(body.features);
  };

  const handleReverseGeocode = () => {};

  const hanldeSubmit = e => {
    e.preventDefault();
  };

  return (
    <Styled.GeocodingWrapper>
      {/* Geocoding Search form */}
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
      {/* Geocoding search results  */}
      <Styled.GeocodingResults existingResults={geocodingResults.length > 0}>
        <Styled.ResultList>
          {geocodingResults.map((result, index) => {
            return (
              <Styled.ResultItem key={index}>
                {result.place_name}
              </Styled.ResultItem>
            );
          })}
        </Styled.ResultList>
      </Styled.GeocodingResults>
    </Styled.GeocodingWrapper>
  );
};

export default GeocodingSearch;
