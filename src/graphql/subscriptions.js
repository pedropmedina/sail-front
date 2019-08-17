import gql from 'graphql-tag';

export const PIN_CREATED_SUBSCRIPTION = gql`
  subscription {
    pinCreated {
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
