import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormLabel,
} from "@material-ui/core";
import { useField, useFormikContext } from "formik";

export default function CheckBox(props) {
  const { name, label, legend } = props;

  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (evt) => {
    const { checked } = evt.target;
    setFieldValue(name, checked);
  };

  const attriutes = {
    ...field,
    onChange: handleChange,
  };

  return (
    <FormControl>
      <FormLabel component={"legend"}>{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...attriutes} />}
          label={label}
        ></FormControlLabel>
      </FormGroup>
    </FormControl>
  );
}
