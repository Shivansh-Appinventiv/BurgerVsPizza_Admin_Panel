import { TextField } from "@material-ui/core";
import { useField } from "formik";

export default function Input(props) {
  const { name, styleClass, ...rest } = props;
  const [field, meta] = useField(name);
  const attributes = {
    ...field,
    ...rest,
    fullWidth: true,
    variant: "outlined",
  };

  if (meta && meta.touched && meta.error) {
    attributes.error = true;
    attributes.helperText = meta.error;
  }
  return (
    <div className={styleClass}>
      <TextField {...attributes} />
    </div>
  );
}
