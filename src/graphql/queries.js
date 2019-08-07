import gql from 'graphql-tag';

export const GET_PINS = gql`
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
