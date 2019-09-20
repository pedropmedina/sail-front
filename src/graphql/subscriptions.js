import gql from 'graphql-tag';

import { pinFragment } from './fragments';

export const PIN_CREATED_SUBSCRIPTION = gql`
  subscription {
    pin: pinCreated {
      ...pinFields
    }
  }
  ${pinFragment}
`;

export const COMMENT_CREATED_SUBSCRIPTION = gql`
  subscription {
    pin: commentCreated {
      ...pinFields
    }
  }
  ${pinFragment}
`;
