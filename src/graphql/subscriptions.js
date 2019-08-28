import gql from 'graphql-tag';

export const PIN_CREATED_SUBSCRIPTION = gql`
  subscription {
    pin: pinCreated {
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

export const COMMENT_CREATED_SUBSCRIPTION = gql`
  subscription {
    pin: commentCreated {
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
