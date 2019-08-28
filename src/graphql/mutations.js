import gql from 'graphql-tag';

export const SIGNUP_USER_MUTATION = gql`
  mutation SignupUser($input: SignupUserInput!) {
    user: signupUser(input: $input) {
      email
      username
      admin
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($input: LoginUserInput!) {
    user: loginUser(input: $input) {
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

export const CREATE_PIN_MUTATION = gql`
  mutation CreatePin($input: CreatePinInput!) {
    pin: createPin(input: $input) {
      _id
      title
      content
      image
      longitude
      latitude
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

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    comment: createComment(input: $input) {
      _id
      text
      pin {
        _id
      }
      author {
        username
        email
      }
      createdAt
    }
  }
`;
