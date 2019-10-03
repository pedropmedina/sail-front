import gql from 'graphql-tag';

import {
  pinFragments,
  planFragments,
  requestFragments,
  commentFragments,
  authFragments
} from './fragments';

// auth mutations
export const SIGNUP_USER_MUTATION = gql`
  mutation SignupUser($input: SignupUserInput!) {
    auth: signupUser(input: $input) {
      token
      user {
        name
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
