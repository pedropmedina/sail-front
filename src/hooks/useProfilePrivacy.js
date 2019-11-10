import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { ME_QUERY } from '../graphql/queries';
import { useForm } from './useForm';


export const useProfilePrivacy = (defaultInputs = {}) => {
  const {
    inputs,
    handleSetInput,
    handleChangeInputs,
    handleSubmitForm: handleSubmit
  } = useForm(defaultInputs);
  const { data } = useQuery(ME_QUERY);

  useEffect(() => {
    if (data && data.user) {
      setupIntialValues(data.user);
    }
  }, [data]);

  const setupIntialValues = async user => {
    const { username } = user;
    handleSetInput('username', username);
  };

  const handleChange = event => {
    handleChangeInputs(event);
  };

  const handleCancel = () => {
    setupIntialValues(data.user);
  };

  return { inputs, handleChange, handleSubmit, handleCancel };
};
