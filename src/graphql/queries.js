import gql from 'graphql-tag';

export const GET_PINS_QUERY = gql`
  {
    pins: getPins {
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
  }
`;

export const ME_QUERY = gql`
  {
    user: me {
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
