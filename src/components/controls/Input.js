import React from "react";
import { TextField } from "@material-ui/core";

const Input = (props) => {
  const { label, value, name, error = null, onChange, ...other } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      value={value}
      name={name}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export default Input;
