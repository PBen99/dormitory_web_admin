/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import InputField from "../../components/common/InputField";
import FormError from "../../components/common/FormError";
import Button from "../../components/common/Button";
import * as AlertMessage from "../../utilities/constants/AlertMessage";
import * as ROUTER from "../../utilities/constants/router";
import validate from "../../utilities/regex";
import { checkExpiration, resetPass } from "../../redux/actions/login";
import Loader from "../../components/common/Loader";

const ResetPassword = () => {
  const { uuid, token } = useParams();

  const history = useHistory();

  const loader = useSelector((state) => state.login.loading);

  const [errorState, setError] = useState({
    newPass: {
      isHidden: true,
      isInputValid: true,
      value: "",
      errorMessage: "",
    },
    verification: {
      isHidden: true,
      isInputValid: true,
      value: "",
      errorMessage: "",
    },
  });

  const [isExpired, setExpiration] = useState(true);

  useEffect(() => {
    checkExpiration(uuid, token, (output) => {
      if (output && output.status) {
        setExpiration(true);
      } else {
        setExpiration(false);
      }
    });
  }, []);

  const validPasswordInput = (checkingValue) => {
    const isValidPass = validate.password(checkingValue);

    if (!isValidPass) {
      return {
        isInputValid: false,
        isErrorHidden: false,
        errorMessage: AlertMessage.PASSWORD_INVALID,
      };
    } else {
      return {
        isInputValid: true,
        isErrorHidden: true,
        errorMessage: AlertMessage.NONE_MESSAGE,
      };
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    const newState = { ...errorState[name] };
    newState.value = value;
    setError({ ...errorState, [name]: newState });
  };

  const resetPassword = (event) => {
    event.preventDefault();

    let passError = validPasswordInput(errorState.newPass.value);

    let verificationError = validPasswordInput(errorState.verification.value);

    if (passError.isInputValid && verificationError.isInputValid) {
      const data = {
        new_password: errorState.newPass.value,
        confirm_password: errorState.verification.value,
      };
      resetPass(data, uuid, token, (output) => {
        if (output.status) {
          alert(output.message);
          history.push(`${ROUTER.ROUTE_LOGIN}`);
        } else {
          alert(output.message);
        }
      });
    }

    const newPassState = { ...errorState.newPass };
    newPassState.isInputValid = passError.isInputValid;
    newPassState.isHidden = passError.isErrorHidden;
    newPassState.errorMessage = passError.errorMessage;

    const newVerification = { ...errorState.verification };
    newVerification.isInputValid = verificationError.isInputValid;
    newVerification.isHidden = verificationError.isErrorHidden;
    newVerification.errorMessage = verificationError.errorMessage;

    setError({
      ...errorState,
      newPass: newPassState,
      verification: newVerification,
    });
  };

  return (
    <div className="login-container">
      {loader ? (
        <div className="align-item-ct">
          <Loader />
        </div>
      ) : (
        <div>
          {!isExpired ? (
            <div className="col col-full text-align-ct">
              <h1 className="text-is-white">Link đã hết hạn</h1>
            </div>
          ) : (
            <div className="form-login">
              <h2 className="title-login">Đặt lại mật khẩu</h2>
              <div className="pl-48 pr-48">
                <FormError
                  isHidden={errorState.newPass.isHidden}
                  errorMessage={errorState.newPass.errorMessage}
                />
                <div className="mb-16">
                  <InputField
                    type="password"
                    isValid={errorState.newPass.isInputValid}
                    id="newPass"
                    name="newPass"
                    placeholder="Mật khẩu mới"
                    autocomplete="off"
                    onChange={handleInput}
                    value={errorState.newPass.value}
                  />
                </div>
                <FormError
                  isHidden={errorState.verification.isHidden}
                  errorMessage={errorState.verification.errorMessage}
                />
                <div className="mb-16">
                  <InputField
                    type="password"
                    isValid={errorState.verification.isInputValid}
                    id="verification"
                    name="verification"
                    placeholder="Xác thực mật khẩu"
                    autocomplete="off"
                    onChange={handleInput}
                    value={errorState.verification.value}
                  />
                </div>
                <Button
                  type="normal-blue"
                  content="Đặt lại"
                  onClick={resetPassword}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default ResetPassword;
