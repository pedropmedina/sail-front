import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

import history from './history';
import {
  getAccessToken,
  setAccessToken,
  deleteAccessToken,
  validateAccessToken,
  renewAccessToken
} from './accessToken';

// authenticate geocoding service
const geocodingService = mbxGeocoding({
  accessToken: process.env.MAPBOX_TOKEN
});

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

export const renewSession = async () => {
  const token = getAccessToken();
  const isTokenUndefinedOrInvalid = !token || !validateAccessToken(token);
  if (isTokenUndefinedOrInvalid) {
    const { ok, accessToken } = await renewAccessToken();
    if (!ok) {
      deleteAccessToken();
      history.push('/');
    } else {
      setAccessToken(accessToken);
    }
  }
};
