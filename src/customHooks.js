import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { ME_QUERY } from './graphql/queries';

const TEXTAREA_DEFAULTS = {
  rows: 2,
  minRows: 2,
  maxRows: 10,
  lineHeight: 24
};

const INPUTS_DEFAULTS = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  about: '',
  phone: '',
  image: '',
  address: ''
};

// user profile details and privacy
export const useProfileForm = () => {
  const [inputs, setInputs] = useState(INPUTS_DEFAULTS);
  const { data } = useQuery(ME_QUERY);

  useEffect(() => {
    if (data && data.user) {
      setupIntialValues(data);
    }
  }, [data]);

  const setupIntialValues = data => {
    const {
      firstName,
      lastName,
      username,
      email,
      about,
      phone,
      image,
      address
    } = data.user;
    setInputs(prevState => ({
      ...prevState,
      firstName,
      lastName,
      username,
      email,
      about,
      phone,
      image,
      address
    }));
  };

  const handleChange = cb => event => {
    const { name, value } = event.target;
    setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    if (cb && typeof cb === 'function') cb(event);
  };

  const handleSubmit = cb => event => {
    event.preventDefault();
    if (cb && typeof cb === 'function') cb(inputs);
  };

  const handleCancel = () => {
    setupIntialValues(data);
  };

  return { inputs, handleChange, handleSubmit, handleCancel };
};

// textarea row growth
export const useTextarea = () => {
  const [rows, setRows] = useState(TEXTAREA_DEFAULTS.rows);

  const handleTextareaChange = event => {
    const { minRows, maxRows, lineHeight } = TEXTAREA_DEFAULTS;
    const prevRows = event.target.rows;
    event.target.rows = minRows; // reset rows
    const currentRows = ~~(event.target.scrollHeight / lineHeight);

    if (currentRows === prevRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    setRows(currentRows < maxRows ? currentRows : maxRows);
  };

  return { rows, handleTextareaChange };
};
