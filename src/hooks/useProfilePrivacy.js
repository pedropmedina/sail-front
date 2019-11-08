import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { ME_QUERY } from '../graphql/queries';

const USER_PRIVACY_INPUTS_DEFAULT = {
  username: '',
  currentPassword: '',
  newPassword: ''
};

export const useProfilePrivacy = () => {
  const [inputs, setInputs] = useState(USER_PRIVACY_INPUTS_DEFAULT);
  const { data } = useQuery(ME_QUERY);

  useEffect(() => {
    if (data && data.user) {
      setupIntialValues(data.user);
    }
  }, [data]);

  const setupIntialValues = async user => {
    const { username } = user;

    setInputs(prevState => ({
      ...prevState,
      username
    }));
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
  };

  const handleSubmit = cb => event => {
    event.preventDefault();
    if (cb && typeof cb === 'function') cb(inputs);
  };

  const handleCancel = () => {
    setupIntialValues(data.user);
  };

  return { inputs, handleChange, handleSubmit, handleCancel };
};