import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { ME_QUERY } from '../graphql/queries';

const USER_DETAIL_INPUTS_DEFAULT = {
  firstName: '',
  lastName: '',
  email: '',
  about: '',
  phone: '',
  image: '',
  address: ''
};

export const useProfileDetails = () => {
  const [inputs, setInputs] = useState(USER_DETAIL_INPUTS_DEFAULT);
  const { data } = useQuery(ME_QUERY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && data.user) {
      setupIntialValues(data.user);
    }
  }, [data]);

  const setupIntialValues = async user => {
    const { firstName, lastName, email, about, phone, image, address } = user;

    setInputs(prevState => ({
      ...prevState,
      firstName: firstName ? firstName : '',
      lastName: lastName ? lastName : '',
      email: email ? email : '',
      about: about ? about : '',
      phone: phone ? phone : '',
      image: image ? image : '',
      address: address ? address : ''
    }));

    setLoading(false);
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

    setInputs(prevInputs => ({ ...prevInputs, address }));
  };

  const handleImageDelete = () => {
    setInputs(prevInputs => ({ ...prevInputs, image: '' }));
  };

  return {
    inputs,
    handleChange,
    handleSubmit,
    handleCancel,
    handleImageDelete,
    handleAddress,
    loading
  };
};
