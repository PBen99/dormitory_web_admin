import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputField from "../../components/common/InputField";
import FormError from "../../components/common/FormError";
import Button from "../../components/common/Button";
import * as AlertMessage from "../../utilities/constants/AlertMessage";
import { sendEmail } from "../../redux/actions/login";
import validate from "../../utilities/regex";
import Loader from "../../components/common/Loader";
const ForgotPassword = () => {
  const [errorState, setError] = useState({
    email: {
      isHidden: true,
      isInputValid: true,
      value: "",
      errorMessage: "",
    },
  });

  const loader = useSelector((state) => state.login.loading);

  const validEmailInput = (checkingValue) => {
    const isValidEmail = validate.email(checkingValue);

    if (!isValidEmail) {
      return {
        isEmailInputValid: false,
        isEmailErrorHidden: false,
        emailErrorMessage: AlertMessage.EMAIL_INVALID,
      };
    } else {
      return {
        isEmailInputValid: true,
        isEmailErrorHidden: true,
        emailErrorMessage: AlertMessage.NONE_MESSAGE,
      };
    }
  };

  const handleInput = (event) => {
    const { value, name } = event.target;
    const newState = { ...errorState[name] };
    newState.value = value;
    setError({ ...errorState, [name]: newState });
  };

  const submit = () => {
    let valid = validEmailInput(errorState.email.value);

    if (valid.isEmailInputValid) {
      const data = { email: errorState.email.value };
      sendEmail(data, (output) => {
        if (output.status) {
          const newEmailState = { ...errorState.email };
          newEmailState.isInputValid = true;
          newEmailState.isHidden = true;
          newEmailState.errorMessage = AlertMessage.NONE_MESSAGE;

          setError({
            ...errorState,
            email: newEmailState,
          });
          alert(output.message);
        } else {
          const newEmailState = { ...errorState.email };
          newEmailState.isInputValid = false;
          newEmailState.isHidden = false;
          newEmailState.errorMessage = AlertMessage.EMAIL_UNAVAILABLE;

          setError({
            ...errorState,
            email: newEmailState,
          });
        }
      });
    } else {
      const newEmailState = { ...errorState.email };
      newEmailState.isInputValid = false;
      newEmailState.isHidden = false;
      newEmailState.errorMessage = AlertMessage.EMAIL_UNAVAILABLE;

      setError({
        ...errorState,
        email: newEmailState,
      });
    }
  };
  return (
    <div className="login-container">
      {loader ? (
        <div className="align-item-ct">
          <Loader />
        </div>
      ) : (
        <div className="form-login">
          <h2 className="title-login">Qu??n m???t kh???u</h2>
          <h3 className="content-login">
            B???n h??y nh???p v??o Email d?????i ????y. Ch??ng t??i s??? g???i cho b???n ???????ng link
            ?????i m???t kh???u m???i.
          </h3>
          <div>
            <FormError
              isHidden={errorState.email.isHidden}
              errorMessage={errorState.email.errorMessage}
            />
            <div className="mb-16 pl-48 pr-48">
              <InputField
                type="text"
                isValid={errorState.email.isInputValid}
                name="email"
                placeholder="?????a ch??? Email"
                autocomplete="off"
                onChange={handleInput}
                value={errorState.email.value}
              />
            </div>
            <Button type="normal-blue" content="X??c nh???n" onClick={submit} />
          </div>
        </div>
      )}
    </div>
  );
};
export default ForgotPassword;
