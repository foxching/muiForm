import React from "react";
import { FormControl, FormControlLabel, Checkbox } from "@material-ui/core";

const CheckInput = (props) => {
  const { name, label, value, onChange } = props;

  const convertDefaultEventPara = (name, value) => ({
    target: {
      name,
      value
    }
  });
  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={value}
            onChange={(e) =>
              onChange(convertDefaultEventPara(name, e.target.checked))
            }
            name={name}
          />
        }
        label={label}
      />
    </FormControl>
  );
};

export default CheckInput;
