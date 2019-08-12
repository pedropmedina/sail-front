import { ADD_CURRENT_USER } from './reducer';
import { ME } from './graphql/queries';

export const getCurrentUser = async (client, dispatch) => {
  const {
    data: { me }
  } = await client.query({ query: ME });
  dispatch({ type: ADD_CURRENT_USER, payload: me });
};
