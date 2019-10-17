/* eslint-disable no-case-declarations */
export const CREATE_DRAFT_PIN = 'CREATE_DRAFT_PIN';
export const UPDATE_DRAFT_PIN = 'UPDATE_DRAFT_PIN';
export const DELETE_DRAFT_PIN = 'DELETE_DRAFT_PIN';
export const UPDATE_CURRENT_PIN = 'UPDATE_CURRENT_PIN';
export const DELETE_CURRENT_PIN = 'DELETE_CURRENT_PIN';
export const SET_POPUP_PIN = 'SET_POPUP_PIN';
export const DELETE_POPUP_PIN = 'DELETE_POPUP_PIN';
export const GET_GEOCODING_RESULTS = 'GET_GEOCODING_RESULTS';
export const SHOW_DRAFT_PIN_POPUP = 'SHOW_DRAFT_PIN_POPUP';
export const CREATE_DRAFT_PIN_POPUP = 'CREATE_DRAFT_PIN_POPUP';
export const UPDATE_DRAFT_PIN_POPUP = 'UPDATE_DRAFT_PIN_POPUP';
export const DELETE_DRAFT_PIN_POPUP = 'DELETE_DRAFT_PIN_POPUP';
export const UPDATE_VIEWPORT = 'UPDATE_VIEWPORT';
export const CREATE_DRAFT_PLAN = 'CREATE_DRAFT_PLAN';
export const UPDATE_DRAFT_PLAN = 'UPDATE_DRAFT_PLAN';
export const DELETE_DRAFT_PLAN = 'DELETE_DRAFT_PLAN';

const DEFAULT_DRAFT_PLAN = {
  title: '',
  description: '',
  location: '',
  date: new Date(),
  invites: [],
  placeName: ''
};

export default function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE_VIEWPORT:
      return { ...state, viewport: payload };
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
    case SET_POPUP_PIN:
      return { ...state, popupPin: payload };
    case DELETE_POPUP_PIN:
      return { ...state, popupPin: null };
    case GET_GEOCODING_RESULTS:
      return { ...state, geocodingResults: payload };
    case SHOW_DRAFT_PIN_POPUP:
      return { ...state, showDraftPinPopup: payload };
    case CREATE_DRAFT_PIN_POPUP:
      return { ...state, draftPinPopup: { longitude: 0, latitude: 0 } };
    case UPDATE_DRAFT_PIN_POPUP:
      return { ...state, draftPinPopup: payload };
    case DELETE_DRAFT_PIN_POPUP:
      return { ...state, draftPinPopup: null };
    case CREATE_DRAFT_PLAN:
      return { ...state, draftPlan: DEFAULT_DRAFT_PLAN };
    case UPDATE_DRAFT_PLAN:
      return { ...state, draftPlan: { ...state.draftPlan, ...payload } };
    case DELETE_DRAFT_PLAN:
      return { ...state, draftPlan: null };
    default:
      return state;
  }
}
