export const getFormResetPass = () => {
  return {
    curPass: {
      isHidden: true,
      isInputValid: true,
      value: "",
      errorMessage: "",
    },
    newPass: {
      isHidden: true,
      isInputValid: true,
      value: "",
      errorMessage: "",
    },
  };
};
