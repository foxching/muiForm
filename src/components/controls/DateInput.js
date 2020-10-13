import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const DateInput = (props) => {
  const { name, label, value, onChange } = props;

  const convertDefaultEventPara = (name, value) => ({
    target: {
      name,
      value
    }
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        inputVariant="outlined"
        variant="inline"
        format="MMM/dd/yyyy"
        name={name}
        label={label}
        value={value}
        onChange={(date) => onChange(convertDefaultEventPara(name, date))}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateInput;
