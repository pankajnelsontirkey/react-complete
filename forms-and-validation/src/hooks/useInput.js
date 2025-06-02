import { useState } from 'react';

export function useInput(defaultValue, validationFn) {
  const [value, setValue] = useState(defaultValue);
  const [touched, setTouched] = useState(false);

  const isValid = validationFn(value);

  function handleChange({ target: { value } }) {
    setValue(value);
    setTouched(false);
  }

  function handleBlur() {
    setTouched(true);
  }

  return {
    value,
    handleBlur,
    handleChange,
    hasError: touched && !isValid
  };
}
