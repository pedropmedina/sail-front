import gql from 'graphql-tag';

import {
  pinFragments,
  planFragments,
  userFragments,
  requestFragments,
  conversationFragments
} from './fragments';

// user queries
export const ME_QUERY = gql`
  {
    user: me {
      ...defaultUserFields
    }
  }
  ${userFragments.default}
`;

export const GET_PROFILE_QUERY = gql`
  query GetUser($userId: ID, $username: String) {
    profile: getUser(userId: $userId, username: $username) {
      ...profileFields
    }
  }
  ${userFragments.profile}
`;

// pin queries
export const GET_PINS_QUERY = gql`
  {
    pins: getPins {
      ...defaultPinFields
    }
  }
  ${pinFragments.default}
`;

export const GET_PIN_BY_COORDS = gql`
  query GetPinByCoords($input: GetPinByCoordsInput!) {
    pin: getPinByCoords(input: $input) {
      ...defaultPinFields
    }
  }
  ${pinFragments.default}
`;

// plan queries
export const GET_PLANS_QUERY = gql`
  {
    plans: getPlans {
      ...defaultPlanFields
    }
  }
  ${planFragments.default}
`;

export const GET_PLAN_QUERY = gql`
  query GetPlan($planId: ID!) {
    plan: getPlan(planId: $planId) {
      ...defaultPlanFields
    }
  }
  ${planFragments.default}
`;

// search queries
export const SEARCH_QUERY = gql`
  query Search($searchText: String!) {
    search(searchText: $searchText) {
      ... on Plan {
        _id
        title
      }
      ... on Pin {
        ...defaultPinFields
      }
      ... on User {
        username
        email
      }
    }
  }
  ${pinFragments.default}
`;

export const SEARCH_PEOPLE_QUERY = gql`
  query Search($searchText: String!) {
    people: searchPeople(searchText: $searchText) {
      ...friendsFields
    }
  }
  ${userFragments.friends}
`;

export const SEARCH_FRIENDS_QUERY = gql`
  {
    friends: searchFriends {
      ...friendsFields
    }
  }
  ${userFragments.friends}
`;

// request queries
export const GET_REQUESTS_QUERY = gql`
  query {
    requests: getRequests {
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

// conversation queries
export const GET_CONVERSATIONS_QUERY = gql`
  query {
    chats: getConversations {
      ...defaultConversationFields
    }
  }
  ${conversationFragments.default}
`;

export const GET_CONVERSATION_QUERY = gql`
  query GetConversation($conversationId: ID!) {
    chat: getConversation(conversationId: $conversationId) {
      ...defaultConversationFields
    }
  }
  ${conversationFragments.default}
`;
