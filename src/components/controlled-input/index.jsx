/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

function FormInputText({ name, control, label, rules }) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { ...rules },
  });

  return (
    <TextField
      label={label}
      error={error}
      onChange={field.onChange} // send value to hook form
      onBlur={field.onBlur} // notify when input is touched/blur
      value={field.value} // input value
      name={field.name} // send down the input name
      inputRef={field.ref} // send input ref, so we can focus on input when error appear
    />
  );
}

FormInputText.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.any,
  rules: PropTypes.shape({
    required: PropTypes.bool,
  }),
};

export default FormInputText;
