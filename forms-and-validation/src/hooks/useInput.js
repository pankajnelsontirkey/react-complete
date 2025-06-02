import { useState } from 'react';

export function useInput({ defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const [touched, setTouched] = useState(false);

  function handleChange({ target: { value } }) {
    setValue(value);
    setTouched(false);
  }

  function handleBlur() {
    setTouched(true);
  }

  return { value, touched, handleChange, handleBlur };
}
