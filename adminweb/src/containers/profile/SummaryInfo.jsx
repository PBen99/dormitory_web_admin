import React, { useState } from "react";
import Button from "../../components/common/Button";
import EditProfile from "./EditProfile";
import * as AlertMessage from "../../utilities/constants/AlertMessage";
import validate from "../../utilities/regex";
import ChangePass from "./ChangePass";
import { getFormResetPass } from "../../utilities/constants/DataRender/password";
import moment from "moment";

const SummaryInfo = (props) => {
  const { dataRender, updateOrigin, updateUserProfile, changeUserPassword } =
    props;

  const [errorState, setError] = useState(getFormResetPass());

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

  const savePass = (event) => {
    event.preventDefault();

    let curPassError = validPasswordInput(errorState.curPass.value);

    let newPassError = validPasswordInput(errorState.newPass.value);

    if (curPassError.isInputValid && newPassError.isInputValid) {
      const data = {
        new_password: errorState.newPass.value,
        old_password: errorState.curPass.value,
        confirm_password: errorState.newPass.value,
      };

      closeChangePassModal();
      changeUserPassword(data);
    }

    const curPassState = { ...errorState.curPass };
    curPassState.isInputValid = curPassError.isInputValid;
    curPassState.isHidden = curPassError.isErrorHidden;
    curPassState.errorMessage = curPassError.errorMessage;

    const newPassState = { ...errorState.newPass };
    newPassState.isInputValid = newPassError.isInputValid;
    newPassState.isHidden = newPassError.isErrorHidden;
    newPassState.errorMessage = newPassError.errorMessage;

    setError({
      ...errorState,
      curPass: curPassState,
      newPass: newPassState,
    });
  };

  const [openChangePass, setOpenChangePass] = useState(false);

  const closeChangePassModal = () => {
    setError(getFormResetPass());
    setOpenChangePass(false);
  };

  const openChangePassModal = () => setOpenChangePass(true);

  const [openEdit, setOpenEdit] = useState(false);

  const closeEditModal = () => setOpenEdit(false);

  const openEditModal = () => setOpenEdit(true);

  return (
    <div className="col col-full  pd-24 style-lg-box bg-color-white style-summaryinfo">
      <div className="col col-full justify-content-sb ml-8">
        <div>
          <span className="text-is-purple-gradient style-profile-name">
            {dataRender.firstName.value} {dataRender.lastName.value}
          </span>
        </div>
        <i
          className="fi-rr-edit"
          style={{ cursor: "pointer" }}
          onClick={openEditModal}
        ></i>
      </div>
      <div className="col col-full mt-8">
        <i className="fi-rr-heart"></i>
        <span>{dataRender.gender.field[dataRender.gender.value]}</span>
      </div>
      <div className="col col-full mt-8">
        <i className="fi-rr-marker"></i>
        <span>{dataRender.address.value}</span>
      </div>
      <div className="col col-full mt-8">
        <i className="fi-rr-envelope"></i>
        <span>{dataRender.email.value}</span>
      </div>
      <div className="col col-full mt-8">
        <i className="fi-rr-bold"></i>
        <span>{moment(dataRender.birthday.value).format("DD/MM/YYYY")}</span>
      </div>
      <div className="col col-full mt-8">
        <i className="fi-rr-smartphone"></i>
        <span>{dataRender.phone.value}</span>
      </div>
      <div className="col col-full mt-8">
        <i className="fi-rr-fingerprint"></i>
        <span>{dataRender.identification.value}</span>
      </div>
      <div className="col col-third style-profile-changepass-btn">
        <Button
          type="normal-ubg"
          content="Đổi mật khẩu"
          isDisable={false}
          onClick={openChangePassModal}
        />
        <ChangePass
          open={openChangePass}
          closeModal={closeChangePassModal}
          errorState={errorState}
          handleInput={handleInput}
          savePass={savePass}
        />
        <EditProfile
          open={openEdit}
          onClose={closeEditModal}
          handleInput={handleInput}
          dataRender={dataRender}
          updateOrigin={updateOrigin}
          updateUserProfile={updateUserProfile}
        />
      </div>
    </div>
  );
};
export default SummaryInfo;
