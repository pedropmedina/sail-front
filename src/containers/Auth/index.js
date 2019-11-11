/* eslint-disable no-console, react/prop-types */
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import * as yup from 'yup';

import { setAccessToken } from '../../accessToken';
import {
  SIGNUP_USER_MUTATION,
  LOGIN_USER_MUTATION
} from '../../graphql/mutations';

import { useForm } from '../../hooks';

import * as Styled from './styled';
import { Form, Fields, Field, Input, Error } from '../../sharedStyles/forms';
import { SaveButton, Button } from '../../sharedStyles/buttons';

import { ReactComponent as AlertIcon } from '../../assets/SVG/alert-circle.svg';
import { ReactComponent as XIcon } from '../../assets/SVG/x.svg';

const PASSWORD_FIELD = {
  label: 'Password',
  name: 'password',
  value: 'password',
  placeholder: 'Your Password'
};

const LOGIN_TEXT = {
  text: 'Login to your sail account',
  altHint: "Don't have an account?",
  altMode: 'Create one',
  buttonText: 'Login',
  fields: {
    username: {
      label: 'Username',
      name: 'username',
      value: 'username',
      placeholder: 'Your Email or Username'
    },
    password: PASSWORD_FIELD
  }
};

const SIGNUP_TEXT = {
  text: 'Create an account',
  altHint: 'Already a sailor?',
  altMode: 'Login to account',
  buttonText: 'Singup',
  fields: {
    username: {
      label: 'Email',
      name: 'email',
      value: 'email',
      placeholder: 'Your Email'
    },
    password: PASSWORD_FIELD
  }
};

const Side = ({
  signUpMode,
  onChangeSignUpMode,
  onSubmit,
  onChangeInput,
  inputs,
  errors,
  textData,
  back = false,
  front = false
}) => {
  const {
    text,
    altHint,
    buttonText,
    fields: { username, password }
  } = textData;

  return (
    <Styled.CardSide signUpMode={signUpMode} front={front} back={back}>
      <Styled.Header>
        <Styled.Title>Sail</Styled.Title>
        <Styled.Subtitle>
          Make plans with friends and family smooth sailing.
        </Styled.Subtitle>
      </Styled.Header>
      <Styled.Text>{text}</Styled.Text>

      <Form onSubmit={onSubmit} noValidate>
        <Fields>
          <Field error={errors[username.name]}>
            <Input
              type="text"
              name={username.name}
              value={inputs[username.value]}
              placeholder={username.placeholder}
              onChange={onChangeInput}
              required
            />
            {errors[username.name] && <Error>{errors[username.name]}</Error>}
          </Field>
        </Fields>
        <Fields>
          <Field error={errors[password.name]}>
            <Input
              type="password"
              name={password.name}
              value={inputs[password.value]}
              placeholder={password.placeholder}
              onChange={onChangeInput}
              required
            />
            {errors[password.name] && <Error>{errors[password.name]}</Error>}
          </Field>
        </Fields>
        <Fields>
          <Field>
            <SaveButton>{buttonText}</SaveButton>
          </Field>
        </Fields>
        <Fields>
          <Field>
            <Button onClick={onChangeSignUpMode} type="button">
              {altHint}
            </Button>
          </Field>
        </Fields>
      </Form>
    </Styled.CardSide>
  );
};

const Auth = ({ history }) => {
  const {
    inputs,
    errors,
    handleChangeInputs,
    handleSubmitForm,
    handleValidateFields,
    handleClearForm,
    handleSetError
  } = useForm({ username: '', email: '', password: '' });
  const [signUpMode, setSignUpMode] = useState(false);
  const [signupUser] = useMutation(SIGNUP_USER_MUTATION, {
    ignoreResults: true
  });
  const [loginUser] = useMutation(LOGIN_USER_MUTATION, { ignoreResults: true });

  const handleAuthData = authData => {
    const { data: { auth } } = authData; // prettier-ignore
    // set access token
    setAccessToken(auth.token);
  };

  const signup = async ({ email, password }) => {
    try {
      const schema = yup.object().shape({
        email: yup
          .string()
          .email()
          .required(),
        password: yup
          .string()
          .min(6)
          .required()
      });
      // stop execution when unvalidated fields
      const validatedFields = await handleValidateFields(schema, {
        email,
        password
      });
      if (!validatedFields) return;

      const authData = await signupUser({
        variables: { input: { email, password } }
      });

      handleAuthData(authData);
      history.push('/map');
    } catch (error) {
      const e = error.message.split(':')[1].trimStart();
      handleSetError('credentials', e);
    }
  };

  const login = async ({ username, password }) => {
    try {
      const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup
          .string()
          .min(6)
          .required()
      });
      // stop execution when unvalidated fields
      const validatedFields = await handleValidateFields(schema, {
        username,
        password
      });
      if (!validatedFields) return;

      const authData = await loginUser({
        variables: {
          input: { username, password }
        }
      });
      handleAuthData(authData);
      history.push('/map');
    } catch (error) {
      const e = error.message.split(':')[1].trimStart();
      handleSetError('credentials', e);
    }
  };

  const handleSetSignUpMode = () => {
    setSignUpMode(!signUpMode);
    handleClearForm();
  };

  const handleChange = event => {
    const name = event.target.name;
    handleChangeInputs(event);

    if (errors[name]) {
      handleSetError(name, '');
    }
  };

  return (
    <Styled.Auth>
      {/* Credential's badge */}
      <Styled.ErrorBadge error={errors.credentials}>
        <AlertIcon />
        {errors.credentials}
        <XIcon onClick={() => handleSetError('credentials', '')} />
      </Styled.ErrorBadge>

      <Styled.Card signUpMode={signUpMode}>
        <Side
          textData={LOGIN_TEXT}
          signUpMode={signUpMode}
          onChangeSignUpMode={handleSetSignUpMode}
          onChangeInput={handleChange}
          onSubmit={handleSubmitForm(login)}
          inputs={inputs}
          errors={errors}
          front
        />
        <Side
          textData={SIGNUP_TEXT}
          signUpMode={signUpMode}
          onChangeSignUpMode={handleSetSignUpMode}
          onChangeInput={handleChange}
          onSubmit={handleSubmitForm(signup)}
          inputs={inputs}
          errors={errors}
          back
        />
      </Styled.Card>
    </Styled.Auth>
  );
};

export default Auth;
