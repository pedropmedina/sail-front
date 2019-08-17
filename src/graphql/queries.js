import gql from 'graphql-tag';

export const GET_PINS_QUERY = gql`
  {
    getPins {
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
      }
      createdAt
    }
  }
`;

export const ME_QUERY = gql`
  {
    me {
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
  }
`;
