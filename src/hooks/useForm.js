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
    setErrors(prevErros => ({ ...prevErros, [name]: value }));
  };

  const handleSubmitForm = cb => event => {
    event.preventDefault();
    if (cb && typeof cb === 'function') cb(inputs);
  };

  const handleValidateFields = async (schema, fields = {}) => {
    try {
      return await schema.validate(fields, { abortEarly: false });
    } catch (error) {
      for (let e of error.inner) {
        const { message, path } = e;
        handleSetError(path, message);
      }
    }
  };

  const handleClearForm = () => {
    setInputs(defaultInputs);
    setErrors(defaultInputs);
  };

  return {
    inputs,
    errors,
    handleChangeInputs,
    handleSetInput,
    handleSetError,
    handleSubmitForm,
    handleValidateFields,
    handleClearForm
  };
};
