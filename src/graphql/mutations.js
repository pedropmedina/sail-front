import gql from 'graphql-tag';

import {
  pinFragments,
  planFragments,
  requestFragments,
  commentFragments,
  authFragments,
  messageFragments,
  conversationFragments,
  userFragments
} from './fragments';

// auth mutations
export const SIGNUP_USER_MUTATION = gql`
  mutation SignupUser($input: SignupUserInput!) {
    auth: signupUser(input: $input) {
      token
      user {
      firstName
      lastName
        username
        email
      }
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($input: LoginUserInput!) {
    auth: loginUser(input: $input) {
      ...defaultAuthFields
    }
  }
  ${authFragments.default}
`;

export const LOGOUT_USER_MUTATION = gql`
  mutation {
    logoutUser
  }
`;

// user mutations
export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      ...defaultUserFields
    }
  }
  ${userFragments.default}
`

// pin mutations
export const CREATE_PIN_MUTATION = gql`
  mutation CreatePin($input: CreatePinInput!) {
    pin: createPin(input: $input) {
      ...defaultPinFields
    }
  }
  ${pinFragments.default}
`;

// comment mutations
export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    comment: createComment(input: $input) {
      ...defaultCommentFields
    }
  }
  ${commentFragments.default}
`;

// plan mutations
export const CREATE_PLAN_MUTATION = gql`
  mutation CreatePlan($input: CreatePlanInput!) {
    plan: createPlan(input: $input) {
      ...defaultPlanFields
    }
  }
  ${planFragments.default}
`;

export const LIKE_PIN = gql`
  mutation LikePin($pinId: ID!) {
    likePin(pinId: $pinId)
  }
`;

export const UNLIKE_PIN = gql`
  mutation UnlikePin($pinId: ID!) {
    unlikePin(pinId: $pinId)
  }
`;

// request mutations
export const CREATE_REQUEST_MUTATION = gql`
  mutation CreateRequest($input: CreateRequestInput!) {
    request: createRequest(input: $input) {
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

export const UPDATE_REQUEST_MUTATION = gql`
  mutation UpdateRequest($input: UpdateRequestInput!) {
    request: updateRequest(input: $input) {
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

export const DELETE_REQUEST_MUTATION = gql`
  mutation DeleteRequest($reqId: ID!) {
    request: deleteRequest(reqId: $reqId) {
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

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage($input: CreateMessageInput!) {
    message: createMessage(input: $input) {
      ...defaultMessageFields
    }
  }
  ${messageFragments.default}
`;

// conversation mutations
export const CREATE_CONVERSATION_MUTATION = gql`
  mutation CreateConversation($input: CreateConversationInput!) {
    conversation: createConversation(input: $input) {
      ...defaultConversationFields
    }
  }
  ${conversationFragments.default}
`;

export const UPDATE_CONVERSATION_UNREADCOUNT_MUTATION = gql`
  mutation UpdateConversationUnreadCount(
    $input: UpdateConversationUnreadCountInput!
  ) {
    conversation: updateConversationUnreadCount(input: $input) {
      ...defaultConversationFields
    }
  }
  ${conversationFragments.default}
`;
