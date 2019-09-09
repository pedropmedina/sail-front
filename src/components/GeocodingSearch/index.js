/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import styled from 'styled-components/macro'; // eslint-disable-line

import * as Styled from './styled';
import ClickOutside from '../../components/ClickOutside';

// Initialize mapbox geocoding service
const geocondingService = mbxGeocoding({
  accessToken: process.env.MAPBOX_TOKEN
});

const DEFAULT_VIEWPORT = {
  longitude: -122.4376,
  latitude: 37.7577
};

const GeocodingSearch = ({
  viewport = DEFAULT_VIEWPORT,
  onClickGeocodingResult,
  css = {}
}) => {
  const [text, setText] = useState('');
  const [geocodingResults, setGeocodingResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // trigger http request to mapbox geocoding api on timeout to avoid excessive requests
  useEffect(() => {
    let timeout = undefined;
    if (text) {
      // clear previous timeout
      clearTimeout(timeout);
      // set new timeout
      timeout = setTimeout(() => handleForwardGeocode(text), 400);
    } else {
      setGeocodingResults([]);
      setShowResults(false);
    }

    // clear any timeout on unmount
    return () => {
      clearTimeout(timeout);
    };
  }, [text]);

  // toggle show results based on click in and out of element
  const onClickOutside = () => {
    setShowResults(false);
  };

  const onClickInside = () => {
    setShowResults(true);
  };

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
    setShowResults(true);
  };

  const hanldeSubmit = e => {
    e.preventDefault();
  };

  return (
    <ClickOutside onClickOutside={onClickOutside} onClickInside={onClickInside}>
      <Styled.GeocodingWrapper css={css}>
        <Styled.Geocoding>
          {/* Geocoding Search form */}
          <Styled.GeocodingSearch onSubmit={hanldeSubmit}>
            <Styled.GeocodingInput
              type="text"
              value={text}
              placeholder="Search by location, category, city..."
              onChange={handleChange}
            />
            <Styled.SearchIcon className="icon icon-small" />
          </Styled.GeocodingSearch>
          {/* Geocoding search results  */}
          <Styled.GeocodingResults
            showResults={showResults && geocodingResults.length > 0}
          >
            <Styled.ResultList>
              {geocodingResults.map((result, index) => {
                return (
                  <Styled.ResultItem
                    key={index}
                    onClick={() => {
                      setShowResults(false);
                      onClickGeocodingResult(result);
                    }}
                  >
                    {result.place_name}
                  </Styled.ResultItem>
                );
              })}
            </Styled.ResultList>
          </Styled.GeocodingResults>
        </Styled.Geocoding>
      </Styled.GeocodingWrapper>
    </ClickOutside>
  );
};

export default GeocodingSearch;
