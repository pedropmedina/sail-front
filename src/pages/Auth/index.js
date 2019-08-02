/* eslint-disable no-console */
import React from 'react';

import * as Styled from './styled';

const Auth = () => {
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Signing in!');
  };

  return (
    <Styled.Container>
      <Styled.AuthContainer>
        <Styled.LeftPanel>
          <Styled.Logo>Sail</Styled.Logo>
          <Styled.Intro>Please login to your account</Styled.Intro>
          <Styled.Form onSubmit={handleSubmit}>
            <label htmlFor="email">Username</label>
            <input
              id="email"
              type="text"
              placeholder="Your Email or Username"
            />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Password" />
            <Styled.LoginBtn>Login</Styled.LoginBtn>
          </Styled.Form>
          <Styled.CreateAccount>
            <span>Don&apos;t have an account?</span>
            <Styled.Btn>Create one</Styled.Btn>
          </Styled.CreateAccount>
        </Styled.LeftPanel>
        <Styled.RightPanel>Welcome to Sail</Styled.RightPanel>
      </Styled.AuthContainer>
    </Styled.Container>
  );
};

export default Auth;
