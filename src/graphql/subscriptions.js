import gql from 'graphql-tag';

import {
  pinFragments,
  commentFragments,
  requestFragments,
  messageFragments,
  conversationFragments
} from './fragments';

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

export const REQUEST_UPDATED_SUBSCRIPTION = gql`
  subscription {
    request: requestUpdated {
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

export const REQUEST_DELETED_SUBSCRIPTION = gql`
  subscription {
    request: requestDeleted {
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

// message subscriptions
export const MESSAGE_CREATED_SUBSCRIPTION = gql`
  subscription MessageCreated($conversationId: ID) {
    message: messageCreated(conversationId: $conversationId) {
      ...defaultMessageFields
    }
  }
  ${messageFragments.default}
`;

// coversation subscriptions
export const CONVERSATION_CREATED_SUBSCRIPTION = gql`
  subscription {
    conversation: conversationCreated {
      ...defaultConversationFields
    }
  }
  ${conversationFragments.default}
`;
