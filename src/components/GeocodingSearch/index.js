/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

import * as Styled from './styled';

import { searchOnTimeout } from '../../utils';

import { ReactComponent as SearchIcon } from '../../assets/SVG/search.svg';
import Select from '../Select';

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
  const [geocodingResults, setGeocodingResults] = useState([]);

  // keep timeout persistant by providing it in the closure and reassigning it on each change
  const handleForwardGeocode = timeout => searchText => {
    if (searchText) {
      // clear existing timeout
      clearTimeout(timeout);
      // set new timeout
      timeout = searchOnTimeout(async () => {
        const { body } = await geocondingService
          .forwardGeocode({
            query: searchText,
            limit: 5,
            proximity: [viewport.longitude, viewport.latitude]
          })
          .send();

        const results = body.features;
        if (results.length > 0) {
          const options = results.map(result => ({
            ...result,
            option: result.place_name
          }));
          setGeocodingResults(options);
          return;
        }
        setGeocodingResults(body.features);
      }, 400);
    } else {
      clearTimeout(timeout);
      setGeocodingResults([]);
    }
  };

  return (
    <Styled.GeocodingSearch>
      <Select
        options={geocodingResults}
        onSelectChange={handleForwardGeocode()}
        onSelectOption={onClickGeocodingResult}
      />
      <SearchIcon />
    </Styled.GeocodingSearch>
  );
};

export default GeocodingSearch;
