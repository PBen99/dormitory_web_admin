import className from "classnames";
const InputField = (props) => {
  const {
    id,
    name,
    isValid,
    type,
    value,
    placeholder,
    onBlur,
    onChange,
    autocomplete,
    disabled,
  } = props;

  const inputStyle = className(
    "form-control",
    `${isValid ? null : "input-error"}`
  );

  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
      autoComplete={autocomplete}
      className={inputStyle}
      onBlur={onBlur}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
export default InputField;
