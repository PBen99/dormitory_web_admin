const FormError = (props) => {
  const { isHidden, errorMessage } = props;

  if (isHidden) {
    return null;
  }
  return <div id="error-mess">{errorMessage}</div>;
};
export default FormError;
