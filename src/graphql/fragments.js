import gql from 'graphql-tag';

export const planFragment = gql`
  fragment planFields on Plan {
    _id
    title
    description
    date
    invites {
      name
      username
      email
    }
    participants {
      name
      username
      email
    }
    location {
      _id
      title
      content
      image
      longitude
      latitude
      comments {
        _id
        text
        author {
          email
          username
          name
        }
        createdAt
      }
      createdAt
    }
    author {
      name
      username
      email
    }
  }
`;

export const pinFragment = gql`
  fragment pinFields on Pin {
    _id
    title
    content
    image
    latitude
    longitude
    author {
      username
      email
    }
    comments {
      _id
      text
      author {
        email
        username
        name
      }
      createdAt
    }
    createdAt
  }
`;

export const userFragment = gql`
  fragment userFields on User {
    email
    username
    name
    image
    friends {
      email
      username
      name
      image
    }
    myPlans {
      _id
      title
      description
      date
    }
    inPlans {
      _id
      title
      description
      date
    }
    likedPins {
      _id
      title
      content
      image
      latitude
      longitude
    }
    sentRequests {
      _id
      to {
        email
        username
      }
      status
      reqType
    }
    receivedRequests {
      _id
      to {
        email
        username
      }
      status
      reqType
    }
    admin
  }
`;
