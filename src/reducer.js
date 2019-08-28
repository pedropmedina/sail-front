/* eslint-disable no-case-declarations */
export const IS_LOGGED_IN = 'IS_LOGGED_IN';
export const CREATE_DRAFT_PIN = 'CREATE_DRAFT_PIN';
export const UPDATE_DRAFT_PIN = 'UPDATE_DRAFT_PIN';
export const DELETE_DRAFT_PIN = 'DELETE_DRAFT_PIN';
export const ADD_CURRENT_USER = 'ADD_CURRENT_USER';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
export const UPDATE_CURRENT_PIN = 'UPDATE_CURRENT_PIN';
export const GET_PINS = 'GET_PINS';
export const PIN_CREATED = 'PIN_CREATED';
export const DELETE_CURRENT_PIN = 'DELETE_CURRENT_PIN';
export const UPDATE_PIN = 'UPDATE_PIN';

export default function reducer(state, { type, payload }) {
  switch (type) {
    case IS_LOGGED_IN:
      return { ...state, isLoggedIn: payload };
    case ADD_CURRENT_USER:
      return { ...state, currentUser: payload };
    case REMOVE_CURRENT_USER:
      return { ...state, currentUser: null };
    case CREATE_DRAFT_PIN:
      return { ...state, draftPin: { longitude: 0, latitude: 0 } };
    case UPDATE_DRAFT_PIN:
      return { ...state, draftPin: payload };
    case DELETE_DRAFT_PIN:
      return { ...state, draftPin: null };
    case UPDATE_CURRENT_PIN:
      return { ...state, currentPin: payload };
    case DELETE_CURRENT_PIN:
      return { ...state, currentPin: null };
    case GET_PINS:
      return { ...state, pins: payload };
    case PIN_CREATED:
      return { ...state, pins: [...state.pins, payload] };
    case UPDATE_PIN:
      const pins = state.pins.map(pin =>
        pin._id === payload._id ? payload : pin
      );
      return { ...state, pins };
    default:
      return state;
  }
}
