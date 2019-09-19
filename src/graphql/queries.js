import gql from 'graphql-tag';

import { planFragment, pinFragment, userFragment } from './fragments';

export const GET_PINS_QUERY = gql`
  {
    pins: getPins {
      ...pinFields
    }
  }
  ${pinFragment}
`;

export const GET_PIN_BY_COORDS = gql`
  query GetPinByCoords($input: GetPinByCoordsInput!) {
    pin: getPinByCoords(input: $input) {
      ...pinFields
    }
  }
  ${pinFragment}
`;

export const ME_QUERY = gql`
  {
    user: me {
      ...userFields
    }
  }
  ${userFragment}
`;

export const GET_PLANS_QUERY = gql`
  {
    plans: getPlans {
      ...planFields
    }
  }
  ${planFragment}
`;
