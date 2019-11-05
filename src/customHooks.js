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

const DEFAULT_COLORS = ['#E0BBE4', '#957DAD', '#D291BC', '#FEC8D8', '#FFDFD3'];

// user profile details
export const useProfileForm = () => {
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
    name: ''
  });

  useEffect(() => {
    let isSubscribed = true;

    if (longitude && latitude) {
      reverseGeocode(longitude, latitude).then(name => {
        if (isSubscribed) {
          setData(prevData => ({ ...prevData, name }));
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
    name: ''
  });

  const lazyFn = async (longitude, latitude) => {
    if (longitude && latitude) {
      reverseGeocode(longitude, latitude).then(name =>
        setData(prevData => ({
          ...prevData,
          name,
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
    const CLOUD_NAME = 'pedropmedina';
    const UPLOAD_PRESET = 'sailApp';
    const URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    if (file) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', UPLOAD_PRESET);
      data.append('cloud_name', CLOUD_NAME);

      const res = await fetch(URL, { method: 'POST', body: data });
      const { url } = await res.json();
      return url;
    }
    return '';
  };

  return {
    file,
    handleFileChange,
    handleFileDelete,
    handleFileDrop,
    handleFileUpload
  };
};

export const useColors = (colorList = DEFAULT_COLORS) => {
  const [colors, setColors] = useState(colorList);

  const addColors = cl => {
    setColors(prevColors => [...prevColors, ...cl]);
  };

  const removeColor = colorName => {
    setColors(prevColors => prevColors.filter(color => color !== colorName));
  };

  const resetColors = () => {
    setColors([]);
  };

  return { colors, addColors, resetColors, removeColor };
};
