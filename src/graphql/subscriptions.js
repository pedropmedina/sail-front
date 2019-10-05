import gql from 'graphql-tag';

import { pinFragments, commentFragments, requestFragments } from './fragments';

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

// request subscriptions
export const REQUEST_CREATED_SUBSCRIPTION = gql`
  subscription {
    request: requestCreated {
      ... on FriendRequest {
        ...defaultRequestFields
      }
      ... on InviteRequest {
        ...inviteRequestFields
      }
    }
  }
  ${requestFragments.default}
  ${requestFragments.invite}
`;
