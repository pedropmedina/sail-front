import gql from 'graphql-tag';

import { pinFragments, commentFragments } from './fragments';

// pin subscriptions
export const PIN_CREATED_SUBSCRIPTION = gql`
  subscription {
    pin: pinCreated {
      ...defaultPinFields
    }
  }
  ${pinFragments.default}
`;

// comment subscriptions
export const COMMENT_CREATED_SUBSCRIPTION = gql`
  subscription {
    comment: commentCreated {
      ...defaultCommentFields
    }
  }
  ${commentFragments.default}
`;
