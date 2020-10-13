import React from "react";
import { TextField } from "@material-ui/core";

const Input = (props) => {
  const { label, value, name, error = null, onChange } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      value={value}
      name={name}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export default Input;
