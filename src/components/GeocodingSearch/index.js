/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

import * as Styled from './styled';
import {
  Select,
  SelectSearch,
  SelectSearchInput,
  SelectResults,
  SelectResultsList,
  SelectResultsItem
} from '../../sharedStyles/select';

import ClickOutside from '../../components/ClickOutside';

import { searchOnTimeout } from '../../utils';

import { ReactComponent as SearchIcon } from '../../assets/SVG/search.svg';

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
  onClickGeocodingResult
}) => {
  const [text, setText] = useState('');
  const [geocodingResults, setGeocodingResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // trigger http request to mapbox geocoding api on timeout to avoid excessive requests
  useEffect(() => {
    let timeout = undefined;
    if (text) {
      timeout = searchOnTimeout(() => {
        handleForwardGeocode(text);
      }, 400);
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
      <Styled.GeocodingSearch>
        <Select>
          <SelectSearch onSubmit={hanldeSubmit}>
            <SelectSearchInput
              id="search"
              type="text"
              value={text}
              placeholder="Search by location, category, city..."
              onChange={handleChange}
            />
            <SearchIcon className="icon icon-small" />
          </SelectSearch>

          <SelectResults
            showResults={showResults && geocodingResults.length > 0}
          >
            <SelectResultsList>
              {geocodingResults.map((result, index) => {
                return (
                  <SelectResultsItem
                    key={index}
                    onClick={() => {
                      setShowResults(false);
                      onClickGeocodingResult(result);
                    }}
                  >
                    {result.place_name}
                  </SelectResultsItem>
                );
              })}
            </SelectResultsList>
          </SelectResults>
        </Select>
      </Styled.GeocodingSearch>
    </ClickOutside>
  );
};

export default GeocodingSearch;
