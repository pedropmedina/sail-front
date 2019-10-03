import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

import { ADD_CURRENT_USER } from './reducer';
import { ME_QUERY } from './graphql/queries';

// authenticate geocoding service
const geocodingService = mbxGeocoding({
  accessToken: process.env.MAPBOX_TOKEN
});

export const getCurrentUser = async (client, dispatch) => {
  try {
    const { data } = await client.query({ query: ME_QUERY });
    dispatch({ type: ADD_CURRENT_USER, payload: data.user });
  } catch {
    // catch here
  }
};

export const reverseGeocode = async (longitude, latitude) => {
  const { body } = await geocodingService
    .reverseGeocode({
      query: [longitude, latitude],
      types: ['address']
    })
    .send();
  return body.features[0].place_name;
};

export const searchOnTimeout = (fn, ms) => {
  // assign undefined to timeout
  let timeout = undefined;
  // clear exising timeout when typing
  clearTimeout(timeout);
  // set new timeout
  timeout = setTimeout(fn, ms);

  return timeout;
};
