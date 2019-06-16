/* eslint-disable no-case-declarations */
export default function reducer(state, { type, payload }) {
  switch (type) {
    case 'IS_LOGGED_IN':
      return { ...state, isLoggedIn: payload.isLoggedIn };
    case 'CREATE_DRAFT_PIN':
      return { ...state, draftPin: { longitude: 0, latitude: 0 } };
    case 'UPDATE_DRAFT_PIN':
      const { longitude, latitude } = payload;
      return { ...state, draftPin: { longitude, latitude } };
    case 'DELETE_DRAFT_PIN':
      return { ...state, draftPin: null };
    default:
      state;
  }
}
