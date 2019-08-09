/* eslint-disable no-console, react/prop-types */
import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { object as yupObject, string as yupString } from 'yup';
import keyBy from 'lodash/keyBy';

import Context from '../../context';
import { IS_LOGGED_IN, ADD_CURRENT_USER } from '../../reducer';
import { SIGNUP_USER, LOGIN_USER } from '../../graphql/mutations';

import * as Styled from './styled';

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
  fields,
  fieldsError,
  textData,
  back = false,
  front = false
}) => {
  const {
    text,
    altHint,
    altMode,
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
      <Styled.AuthForm onSubmit={onSubmit}>
        <Styled.AuthField
          error={
            (front && fieldsError['usernameError']) ||
            (back && fieldsError['emailError'])
          }
        >
          {username.label}
          <input
            type="text"
            name={username.name}
            value={fields[username.value]}
            placeholder={username.placeholder}
            onChange={onChangeInput}
          />
        </Styled.AuthField>
        <Styled.AuthField
          error={
            (front && fieldsError['passwordError']) ||
            (back && fieldsError['passwordError'])
          }
        >
          {password.label}
          <input
            type="password"
            name={password.name}
            value={fields[password.value]}
            placeholder={password.placeholder}
            onChange={onChangeInput}
          />
        </Styled.AuthField>
        <Styled.SubmitButton>{buttonText}</Styled.SubmitButton>
      </Styled.AuthForm>
      <Styled.AltMode>
        <span>{altHint}</span>
        <Styled.Button onClick={onChangeSignUpMode}>{altMode}</Styled.Button>
      </Styled.AltMode>
    </Styled.CardSide>
  );
};

const Auth = ({ history }) => {
  const { dispatch } = useContext(Context);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signUpMode, setSignUpMode] = useState(false);
  const [signupUser] = useMutation(SIGNUP_USER, { ignoreResults: true });
  const [loginUser] = useMutation(LOGIN_USER, { ignoreResults: true });

  const handleAuthData = data => {
    const {
      data: {
        auth: { token, user }
      }
    } = data;
    dispatch({ type: ADD_CURRENT_USER, payload: user });
    dispatch({ type: IS_LOGGED_IN, payload: true });
    localStorage.setItem('token', token);
    localStorage.setItem('isLoggedIn', true);
    history.push('/');
  };

  const validateFields = async () => {
    try {
      const schema = yupObject().shape({
        [!signUpMode ? 'username' : 'email']: !signUpMode
          ? yupString().required('username is required.')
          : yupString()
              .email()
              .required('email is required.'),
        password: yupString()
          .min(6)
          .required('password is required')
      });
      const validateObj = {
        [!signUpMode ? 'username' : 'email']: !signUpMode ? username : email,
        password
      };
      return await schema.validate(validateObj, { abortEarly: false });
    } catch (error) {
      const errorsByPath = keyBy(error.inner, 'path');
      const mappedErrorSetters = {
        username: setUsernameError,
        email: setEmailError,
        password: setPasswordError
      };
      for (let prop in errorsByPath) {
        if (errorsByPath.hasOwnProperty(prop)) {
          const { path, message } = errorsByPath[prop];
          mappedErrorSetters[path](message);
        }
      }
    }
  };

  const handleSubmit = (mode = 'login') => {
    return async e => {
      e.preventDefault();

      // stop execution when unvalidated fields
      const validatedFields = await validateFields();
      if (!validatedFields) return;

      try {
        let authData;
        mode === 'login'
          ? (authData = await loginUser({
              variables: {
                input: { username: email ? email : username, password }
              }
            }))
          : (authData = await signupUser({
              variables: { input: { email, password } }
            }));

        setEmail('');
        setUsername('');
        setPassword('');
        handleAuthData(authData);
      } catch (error) {
        console.error(error.message.split(':')[1]);
      }
    };
  };

  const handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    name === 'email'
      ? setEmail(value)
      : name === 'username'
      ? setUsername(value)
      : setPassword(value);

    // reset field error message upon typing
    const mappedError = {
      username: { message: usernameError, setter: setUsernameError },
      email: { message: emailError, setter: setEmailError },
      password: { message: passwordError, setter: setPasswordError }
    };
    if (mappedError[name]['message']) {
      mappedError[name]['setter']('');
    }
  };

  const handleSetSignUpMode = () => {
    setSignUpMode(!signUpMode);
    setEmail('');
    setUsername('');
    setPassword('');
    setEmailError('');
    setUsernameError('');
    setPasswordError('');
  };

  return (
    <Styled.Container>
      <Styled.Card signUpMode={signUpMode}>
        <Side
          textData={LOGIN_TEXT}
          signUpMode={signUpMode}
          onChangeSignUpMode={handleSetSignUpMode}
          onChangeInput={handleInput}
          onSubmit={handleSubmit()}
          fields={{ username, password }}
          fieldsError={{ usernameError, passwordError }}
          front
        />
        <Side
          textData={SIGNUP_TEXT}
          signUpMode={signUpMode}
          onChangeSignUpMode={handleSetSignUpMode}
          onChangeInput={handleInput}
          onSubmit={handleSubmit('signup')}
          fields={{ email, password }}
          fieldsError={{ emailError, passwordError }}
          back
        />
      </Styled.Card>
    </Styled.Container>
  );
};

export default Auth;
