/* eslint-disable no-console, react/prop-types */
import React, { useState } from 'react';

import * as Styled from './styled';

const Side = ({
  signUpMode,
  setSignUpMode,
  onSubmit,
  text,
  altHint,
  altMode,
  buttonText,
  back = false,
  front = false
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
        <label htmlFor="email">Username</label>
        <input id="email" type="text" placeholder="Your Email or Username" />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" placeholder="Password" />
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
  const [signUpMode, setSignUpMode] = useState(false);

  const handleSignup = e => {
    e.preventDefault();
    console.log('Signing up!');
  };

  const handleLogin = e => {
    e.preventDefault();
    console.log('loging in!');
  };

  return (
    <Styled.Container>
      <Styled.Card signUpMode={signUpMode}>
        <Side
          {...LOGIN_TEXT}
          signUpMode={signUpMode}
          setSignUpMode={setSignUpMode}
          onSubmit={handleLogin}
          front
        />
        <Side
          {...SIGNUP_TEXT}
          signUpMode={signUpMode}
          setSignUpMode={setSignUpMode}
          onSubmit={handleSignup}
          back
        />
      </Styled.Card>
    </Styled.Container>
  );
};

export default Auth;
