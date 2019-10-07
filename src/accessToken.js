import jwtDecode from 'jwt-decode';

export const setAccessToken = token =>
  localStorage.setItem('accessToken', token);

export const getAccessToken = () => localStorage.getItem('accessToken');

export const deleteAccessToken = () => localStorage.removeItem('accessToken');

export const validateAccessToken = token => {
  const { exp } = jwtDecode(token);
  return Date.now() <= exp * 1000;
};

export const renewAccessToken = async () => {
  const res = await fetch('http://localhost:4000/refresh_token', {
    method: 'POST',
    credentials: 'include'
  });
  // response comes as {ok: boolean, acccesToken: token || ''}
  const { accessToken } = await res.json();
  return accessToken;
};
