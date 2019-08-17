import { ADD_CURRENT_USER } from './reducer';
import { ME_QUERY } from './graphql/queries';

export const getCurrentUser = async (client, dispatch) => {
  const {
    data: { me }
  } = await client.query({ query: ME_QUERY });
  dispatch({ type: ADD_CURRENT_USER, payload: me });
};
