import * as Cookies from 'js-cookie';

import { ADD_CURRENT_USER, IS_LOGGED_IN, REMOVE_CURRENT_USER } from './reducer';
import { ME_QUERY } from './graphql/queries';

export const getCurrentUser = async (client, dispatch) => {
  try {
    const { data } = await client.query({ query: ME_QUERY });
    dispatch({ type: ADD_CURRENT_USER, payload: data.user });
  } catch {
    // catch here
  }
};

export const checkSession = () => {
  const token = Cookies.get('refresh-token');
  return !!token;
};

export const establishSession = async (client, dispatch, setState) => {
  const isLoggedIn = checkSession(); // check if user is logged in
  setState(isLoggedIn); // sets isLoggedIn hook state
  dispatch({ type: IS_LOGGED_IN, payload: isLoggedIn }); // send current session state to reducer state
  if (isLoggedIn) {
    await getCurrentUser(client, dispatch); // queries current user's info and sends it to reducer
  } else {
    dispatch({ type: REMOVE_CURRENT_USER }); // remove current user from state reducer when not logged in
  }
};