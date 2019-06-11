export default function reducer(state, { type, payload }) {
  switch (type) {
    case 'IS_LOGGED_IN':
      return { ...state, isLoggedIn: payload.isLoggedIn };
    default:
      state;
  }
}
