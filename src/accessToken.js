export const setAccessToken = token =>
  localStorage.setItem('accessToken', token);

export const getAccessToken = () => localStorage.getItem('accessToken');

export const deleteAccessToken = () => localStorage.removeItem('accessToken');
