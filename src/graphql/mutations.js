import gql from 'graphql-tag';

export const SIGNUP_USER = gql`
  mutation SignupUser($input: SignupUserInput!) {
    signupUser(input: $input) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      token
      user {
        username
        email
      }
    }
  }
`;
