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
            <input type="text" placeholder="Your Email" />
            <input type="password" placeholder="Password" />
            <Styled.LoginBtn>Login</Styled.LoginBtn>
          </Styled.Form>
          <Styled.CreateAccount>
            Need an account?<Styled.Btn>Create Account</Styled.Btn>
          </Styled.CreateAccount>
        </Styled.LeftPanel>
        <Styled.RightPanel>Welcome to Sail</Styled.RightPanel>
      </Styled.AuthContainer>
    </Styled.Container>
  );
};

export default Auth;
