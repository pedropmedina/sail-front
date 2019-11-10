import { useState } from 'react';

export const useForm = (defaultInputs = {}) => {
  const [inputs, setInputs] = useState(defaultInputs);
  const [errors, setErrors] = useState(defaultInputs);

  const handleChangeInputs = event => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
  };

  const handleSetInput = (name, value) => {
    setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
  };

  const handleSetError = (name, value) => {
    setErrors(prevErros => ({...prevErros, [name]: value }))
  }

  return { inputs, errors, handleChangeInputs, handleSetInput, handleSetError };
};
