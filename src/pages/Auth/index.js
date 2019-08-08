/* eslint-disable no-console, react/prop-types */
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { SIGNUP_USER, LOGIN_USER } from '../../graphql/mutations';

import * as Styled from './styled';

const LOGIN_TEXT = {
  text: 'Login to your sail account',
  altHint: "Don't have an account?",
  altMode: 'Create one',
  buttonText: 'Login'
};

const SIGNUP_TEXT = {
  text: 'Create an account',
  altHint: 'Already a sailor?',
  altMode: 'Login to account',
  buttonText: 'Singup'
};

const Side = ({
  signUpMode,
  setSignUpMode,
  onSubmit,
  onChangeInput,
  text,
  altHint,
  altMode,
  buttonText,
  back = false,
  front = false,
  fields
}) => {
  return (
    <Styled.CardSide signUpMode={signUpMode} front={front} back={back}>
      <Styled.Header>
        <Styled.Title>Sail</Styled.Title>
        <Styled.Subtitle>
          Make plans with friends and family smooth sailing.
        </Styled.Subtitle>
      </Styled.Header>
      <Styled.Text>{text}</Styled.Text>
      <Styled.Form onSubmit={onSubmit}>
        <label>Username</label>
        <input
          type="text"
          name={front ? 'username' : 'email'}
          value={front ? fields['username'] : fields['email']}
          placeholder="Your Email or Username"
          onChange={onChangeInput}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={fields['password']}
          placeholder="Password"
          onChange={onChangeInput}
        />
        <Styled.SubmitButton>{buttonText}</Styled.SubmitButton>
      </Styled.Form>
      <Styled.AltMode>
        <span>{altHint}</span>
        <Styled.Button onClick={() => setSignUpMode(!signUpMode)}>
          {altMode}
        </Styled.Button>
      </Styled.AltMode>
    </Styled.CardSide>
  );
};

const Auth = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUpMode, setSignUpMode] = useState(false);
  const [signupUser] = useMutation(SIGNUP_USER, { ignoreResults: true });
  const [loginUser] = useMutation(LOGIN_USER, { ignoreResults: true });

  const handleSubmit = async (mode = 'login') => {
    let authData;
    mode === 'login'
      ? (authData = await loginUser({
          variables: { input: { username: email ? email : username, password } }
        }))
      : (authData = await signupUser({
          variabels: { input: { email, password } }
        }));

    setEmail('');
    setUsername('');
    setPassword('');
    return authData;
  };

  const handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    name === 'email'
      ? setEmail(value)
      : name === 'username'
      ? setUsername(value)
      : setPassword(value);
  };

  const handleSignup = async e => {
    e.preventDefault();
    const { data } = await handleSubmit('signup');
    console.log(data);
  };

  const handleLogin = async e => {
    e.preventDefault();
    const { data } = await handleSubmit();
    console.log(data);
  };

  return (
    <Styled.Container>
      <Styled.Card signUpMode={signUpMode}>
        <Side
          {...LOGIN_TEXT}
          signUpMode={signUpMode}
          setSignUpMode={setSignUpMode}
          onChangeInput={handleInput}
          onSubmit={handleLogin}
          fields={{ email, username, password }}
          front
        />
        <Side
          {...SIGNUP_TEXT}
          signUpMode={signUpMode}
          setSignUpMode={setSignUpMode}
          onChangeInput={handleInput}
          onSubmit={handleSignup}
          fields={{ email, username, password }}
          back
        />
      </Styled.Card>
    </Styled.Container>
  );
};

export default Auth;
