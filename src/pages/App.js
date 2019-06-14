/* eslint-disable no-console, react/prop-types */
import { hot } from 'react-hot-loader/root';
import React, { useEffect, useContext } from 'react';
import { Layout } from 'antd';

import auth from '../Auth';
import Context from '../context';

import Map from '../components/Map';
import Header from '../components/Header';

const App = () => {
  const { state, dispatch } = useContext(Context);
  const { isLoggedIn } = state;

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true' && !isLoggedIn) {
      handleRenewSession();
    }
  }, []);

  const handleRenewSession = async () => {
    try {
      await auth.renewSession();
      dispatch({ type: 'IS_LOGGED_IN', payload: { isLoggedIn: true } });
    } catch (error) {
      console.error('Error while renewing session ', error);
    }
  };

  return (
    <Layout className="layout">
      <Header auth={auth} />
      <Map auth={auth} />
    </Layout>
  );
};

export default hot(App);
