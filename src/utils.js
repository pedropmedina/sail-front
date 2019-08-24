import { ADD_CURRENT_USER } from './reducer';
import { ME_QUERY } from './graphql/queries';

export const getCurrentUser = async (client, dispatch) => {
  try {
    const { data } = await client.query({ query: ME_QUERY });
    dispatch({ type: ADD_CURRENT_USER, payload: data.user });
  } catch {
    // catch here
  }
};
