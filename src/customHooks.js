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

const USER_DETAIL_INPUTS_DEFAULT = {
  firstName: '',
  lastName: '',
  email: '',
  about: '',
  phone: '',
  image: '',
  address: ''
};

const USER_PRIVACY_INPUTS_DEFAULT = {
  username: '',
  currentPassword: '',
  newPassword: ''
};

// user profile details
export const useProfileForm = () => {
  const [inputs, setInputs] = useState(USER_DETAIL_INPUTS_DEFAULT);
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
    let reversedGeocode = '';
    let address = { reversedGeocode, longitude, latitude };
    if (longitude && latitude) {
      reversedGeocode = await reverseGeocode(longitude, latitude);
      address = { reversedGeocode, longitude, latitude };
    }

    setInputs(prevState => ({
      ...prevState,
      firstName: firstName ? firstName : '',
      lastName: lastName ? lastName : '',
      email: email ? email : '',
      about: about ? about : '',
      phone: phone ? phone : '',
      image: image ? image : '',
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
      address: { reversedGeocode: place_name, longitude, latitude }
    }));
  };

  return { inputs, handleChange, handleSubmit, handleCancel, handleAddress };
};

// deal with profile privacy
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
    reversedGeocode: ''
  });

  useEffect(() => {
    let isSubscribed = true;

    if (longitude && latitude) {
      reverseGeocode(longitude, latitude).then(reversedGeocode => {
        if (isSubscribed) {
          setData(prevData => ({ ...prevData, reversedGeocode }));
        }
      });
    }

    return () => {
      isSubscribed = false;
    };
  }, []);

  return { ...data };
};

export const useLazyReverseGeocode = () => {
  const [data, setData] = useState({
    longitude: 0,
    latitude: 0,
    reversedGeocode: ''
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

// deal with uploading file to cloudinary
export const useFileUpload = () => {
  const [file, setFile] = useState('');

  const validateFileType = file => {
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return fileTypes.some(type => type === file.type);
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (validateFileType(file)) {
      setFile(file);
    }
  };

  const handleFileDrop = file => {
    if (validateFileType(file)) {
      setFile(file);
    }
  };

  const handleFileDelete = () => {
    setFile('');
  };

  const handleFileUpload = async () => {
    const cloudName = 'pedropmedina';
    const uploadPreset = 'sailApp';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', uploadPreset);
    data.append('cloud_name', cloudName);

    const res = await fetch(url, { method: 'POST', body: data });
    return await res.json();
  };

  return {
    file,
    handleFileChange,
    handleFileDelete,
    handleFileDrop,
    handleFileUpload
  };
};
