import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { ME_QUERY } from '../graphql/queries';
import { useForm } from './useForm';
import { useTextarea } from './useTextarea';

export const useProfileDetails = (defaultInputs = {}) => {
  const {
    inputs,
    handleSetInput,
    handleChangeInputs,
    handleSubmitForm: handleSubmit
  } = useForm(defaultInputs);
  const { rows, handleTextareaChange } = useTextarea();

  const { data } = useQuery(ME_QUERY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && data.user) {
      setupIntialValues(data.user);
    }
  }, [data]);

  const setupIntialValues = async user => {
    const { firstName, lastName, email, about, phone, image, address } = user;
    handleSetInput('firstName', firstName || '');
    handleSetInput('lastName', lastName || '');
    handleSetInput('email', email || '');
    handleSetInput('about', about || '');
    handleSetInput('phone', phone || '');
    handleSetInput('image', image || '');
    handleSetInput('address', address || '');

    setLoading(false);
  };

  const handleChange = event => {
    const { name } = event.target;
    if (name === 'about') handleTextareaChange(event);

    handleChangeInputs(event);
  };

  const handleCancel = () => {
    setupIntialValues(data.user);
  };

  const handleAddress = data => {
    const { place_name, center, context } = data;
    const [longitude, latitude] = center;
    const mappedData = context.reduce((acc, d) => {
      const key = d.id.split('.')[0];
      acc[key] = d.text;
      return acc;
    }, {});

    const address = { ...mappedData, name: place_name, longitude, latitude };
    handleSetInput('address', address);
  };

  const handleImageDelete = () => {
    handleSetInput('image', '');
  };

  return {
    inputs,
    handleChange,
    handleSubmit,
    handleCancel,
    handleImageDelete,
    handleAddress,
    loading,
    rows
  };
};
