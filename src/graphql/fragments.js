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
