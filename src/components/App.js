/* eslint-disable react/prop-types */
import { hot } from 'react-hot-loader/root';
import React from 'react';

import auth from '../Auth';

import Map from './Map';
import Header from './Header';

const App = () => {
  return (
    <>
      <Header auth={auth} />
      <Map auth={auth} />
    </>
  );
};

export default hot(App);
