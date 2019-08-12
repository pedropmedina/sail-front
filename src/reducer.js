/* eslint-disable no-case-declarations */
export const IS_LOGGED_IN = 'IS_LOGGED_IN';
export const CREATE_DRAFT_PIN = 'CREATE_DRAFT_PIN';
export const UPDATE_DRAFT_PIN = 'UPDATE_DRAFT_PIN';
export const DELETE_DRAFT_PIN = 'DELETE_DRAFT_PIN';
export const ADD_CURRENT_USER = 'ADD_CURRENT_USER';

export default function reducer(state, { type, payload }) {
  switch (type) {
    case IS_LOGGED_IN:
      return { ...state, isLoggedIn: payload };
    case CREATE_DRAFT_PIN:
      return { ...state, draftPin: { longitude: 0, latitude: 0 } };
    case UPDATE_DRAFT_PIN:
      return { ...state, draftPin: payload };
    case DELETE_DRAFT_PIN:
      return { ...state, draftPin: null };
    case ADD_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      state;
  }
}
