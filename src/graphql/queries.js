import gql from 'graphql-tag';

import {
  planFragment,
  pinFragment,
  userFragments,
  requestFragments
} from './fragments';

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

export const GET_PLANS_QUERY = gql`
  {
    plans: getPlans {
      ...planFields
    }
  }
  ${planFragment}
`;

export const SEARCH_QUERY = gql`
  query Search($searchText: String!) {
    search(searchText: $searchText) {
      ... on Plan {
        _id
        title
      }
      ... on Pin {
        _id
        title
      }
      ... on User {
        username
        email
      }
    }
  }
`;

export const SEARCH_PEOPLE_QUERY = gql`
  query Search($searchText: String!) {
    people: searchPeople(searchText: $searchText) {
      ...peopleFields
    }
  }
  ${userFragments.people}
`;

export const SEARCH_FRIENDS_QUERY = gql`
  {
    friends: searchFriends {
      ...peopleFields
    }
  }
  ${userFragments.people}
`;

export const GET_REQUESTS_QUERY = gql`
  query GetRequests($reqType: REQUEST_TYPE) {
    requests: getRequests(reqType: $reqType) {
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
