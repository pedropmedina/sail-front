import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { ME_QUERY } from './graphql/queries';
import { reverseGeocode } from './utils';

const TEXTAREA_DEFAULTS = {
  rows: 2,
  minRows: 2,
  maxRows: 10,
  lineHeight: 24
};

const INPUTS_DEFAULTS = {
  firstName: '',
  lastName: '',
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
      setupIntialValues(data.user);
    }
  }, [data]);

  const setupIntialValues = async user => {
    const { firstName, lastName, email, about, phone, image } = user;

  // prepare address to be passed down to inputs
    const { longitude, latitude } = user.address;
    const reversedGeocode = await reverseGeocode(longitude, latitude);
    const address = { reversedGeocode, longitude, latitude }
    
    setInputs(prevState => ({
      ...prevState,
      firstName,
      lastName,
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
    setupIntialValues(data.user);
  };

  const handleAddress = data => {
    const { place_name, center } = data;
    const [longitude, latitude] = center;
    setInputs(prevInputs => ({
      ...prevInputs,
      address: { reversedAddress: place_name, longitude, latitude }
    }));
  };

  return { inputs, handleChange, handleSubmit, handleCancel, handleAddress };
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

// reverse geocode
export const useReverseGeocode = (longitude, latitude) => {
  const [data, setData] = useState({
    longitude,
    latitude,
    reversedGeocode: null
  });

  useEffect(() => {
    if (longitude && latitude) {
      reverseGeocode(longitude, latitude).then(reversedGeocode =>
        setData(prevData => ({ ...prevData, reversedGeocode }))
      );
    }
  }, []);

  return { ...data };
};

export const useLazyReverseGeocode = () => {
  const [data, setData] = useState({
    longitude: 0,
    latitude: 0,
    reversedGeocode: null
  });

  const lazyFn = async (longitude, latitude) => {
    if (longitude && latitude) {
      reverseGeocode(longitude, latitude).then(reversedGeocode =>
        setData(prevData => ({
          ...prevData,
          reversedGeocode,
          longitude,
          latitude
        }))
      );
    }
  };

  return [lazyFn, { ...data }];
};
