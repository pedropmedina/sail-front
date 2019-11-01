import { useState } from 'react';

export const useProfileForm = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = event => {
    const { name, value } = event.target;
    setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
  };

  const handleSubmit = cb => event => {
    event.preventDefault();
    if (cb && typeof cb === 'function') cb();
  };

  return { inputs, handleChange, handleSubmit };
};
