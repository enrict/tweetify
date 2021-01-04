import { useState } from "react";

export const useForm = (callBack, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callBack();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
