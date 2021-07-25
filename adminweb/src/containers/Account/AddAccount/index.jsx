import React, { useState } from "react";
import "./styles.css";
import Popup from "reactjs-popup";
import Button from "../../../components/common/Button";
import FormError from "../../../components/common/FormError";
import InputField from "../../../components/common/InputField";
import { getSendData } from "../../../utilities/constants/DataRender/account";
import ReactTags from "react-tag-autocomplete";
import validate from "../../../utilities/regex";

export default function AddAccount(props) {
  var {
    userInfor,
    createAccount,
    permission,
    faculty,
    class_in_university,
    area,
    position,
    hideModal,
    isOpen,
  } = props;

  const [newAccount, setAccount] = useState(userInfor);

  function handleInput(event) {
    const { name, value } = event.target;
    const newState = { ...newAccount[name] };
    newState.value = value;
    setAccount({ ...newAccount, [name]: newState });
  }

  function handleGroupAddition(tag) {
    const newState = [...newAccount.group];

    if (!newState.includes(tag)) {
      newState.push(tag);
      setAccount({
        ...newAccount,
        group: newState,
      });
    }
  }

  function validateEditedinfo() {
    let tempEditData = { ...newAccount };

    Object.keys(newAccount).forEach((value) => {
      if (
        newAccount[value].validateType &&
        !validate[newAccount[value].validateType](newAccount[value].value)
      ) {
        tempEditData[value].isValid = false;
        tempEditData[value].isHidden = false;
      } else {
        tempEditData[value].isValid = true;
        tempEditData[value].isHidden = true;
      }
      setAccount(tempEditData);
    });
  }

  function handleGroupDelete(i) {
    const tags = newAccount.group.slice(0);
    tags.splice(i, 1);
    setAccount({ ...newAccount, group: tags });
  }

  function handlePermissionAddition(tag) {
    const newState = [...newAccount.permission];

    if (!newState.includes(tag)) {
      newState.push(tag);
      setAccount({
        ...newAccount,
        permission: newState,
      });
    }
  }

  function handlePermissionDelete(i) {
    const tags = newAccount.permission.slice(0);
    tags.splice(i, 1);
    setAccount({ ...newAccount, permission: tags });
  }

  function onSave() {
    validateEditedinfo();

    if (
      !newAccount.firstName.isValid ||
      !newAccount.lastName.isValid ||
      !newAccount.address.isValid ||
      !newAccount.email.isValid ||
      newAccount.group.length === 0 ||
      !newAccount.identify_card.isValid ||
      !newAccount.phone.isValid ||
      !newAccount.password.isValid ||
      newAccount.password.value !== newAccount.confirm.value ||
      !newAccount.confirm.isValid ||
      !newAccount.username.isValid
    ) {
      return;
    }

    const data = getSendData(newAccount);
    createAccount(data);
    setAccount(userInfor);
  }
  return (
    <div>
      {permission && faculty && area && class_in_university && position && (
        <Popup open={isOpen} closeOnDocumentClick onClose={() => hideModal()}>
          <div className="col lg-modal style-lg-box bg-color-white text-align-ct">
            <h2>Nhập thông tin cá nhân mới</h2>
            <div className="col col-full">
              <div className="col col-full pd-24 style-account-modal">
                <div className="col col-full mt-8">
                  <div className="col col-half mt-8 pr-4">
                    <FormError
                      isHidden={newAccount.firstName.isHidden}
                      errorMessage={newAccount.firstName.errorMessage}
                    />
                  </div>
                  <div className="col col-half mt-8 pl-4">
                    <FormError
                      isHidden={newAccount.lastName.isHidden}
                      errorMessage={newAccount.lastName.errorMessage}
                    />
                  </div>
                </div>
                <div className="col col-full mt-8">
                  <div className="col col-half pr-4">
                    <InputField
                      name="firstName"
                      isValid={newAccount.firstName.isValid}
                      value={newAccount.firstName.value}
                      type={newAccount.firstName.type}
                      placeholder={newAccount.firstName.title}
                      onChange={handleInput}
                      autocomplete="off"
                    />
                  </div>
                  <div className="col col-half pl-4">
                    <InputField
                      name="lastName"
                      isValid={newAccount.lastName.isValid}
                      value={newAccount.lastName.value}
                      type={newAccount.lastName.type}
                      placeholder={newAccount.lastName.title}
                      onChange={handleInput}
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div className="col col-full mt-8">
                  <FormError
                    isHidden={newAccount.email.isHidden}
                    errorMessage={newAccount.email.errorMessage}
                  />
                  <InputField
                    name="email"
                    isValid={newAccount.email.isValid}
                    value={newAccount.email.value}
                    type={newAccount.email.type}
                    placeholder={newAccount.email.title}
                    onChange={handleInput}
                    autocomplete="off"
                  />
                </div>
                <div className="col col-full mt-8">
                  <FormError
                    isHidden={newAccount.birthday.isHidden}
                    errorMessage={newAccount.birthday.errorMessage}
                  />
                  <InputField
                    name="birthday"
                    isValid={newAccount.birthday.isValid}
                    value={newAccount.birthday.value}
                    type={newAccount.birthday.type}
                    placeholder={newAccount.birthday.title}
                    onChange={handleInput}
                    autocomplete="off"
                  />
                </div>
                <div className="col col-full mt-8">
                  <div className="col col-half pr-4">
                    <FormError
                      isHidden={newAccount.phone.isHidden}
                      errorMessage={newAccount.phone.errorMessage}
                    />
                  </div>
                  <div className="col col-half pl-4">
                    <FormError
                      isHidden={newAccount.identify_card.isHidden}
                      errorMessage={newAccount.identify_card.errorMessage}
                    />
                  </div>
                </div>
                <div className="col col-full ">
                  <div className="col col-half  pr-4">
                    <InputField
                      name="phone"
                      isValid={newAccount.phone.isValid}
                      value={newAccount.phone.value}
                      type={newAccount.phone.type}
                      placeholder={newAccount.phone.title}
                      onChange={handleInput}
                      autocomplete="off"
                    />
                  </div>
                  <div className="col col-half pr-4">
                    <InputField
                      name="identify_card"
                      isValid={newAccount.identify_card.isValid}
                      value={newAccount.identify_card.value}
                      type={newAccount.identify_card.type}
                      placeholder={newAccount.identify_card.title}
                      onChange={handleInput}
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div className="col col-full mt-8">
                  <FormError
                    isHidden={newAccount.address.isHidden}
                    errorMessage={newAccount.address.errorMessage}
                  />
                  <InputField
                    name="address"
                    isValid={newAccount.address.isValid}
                    value={newAccount.address.value}
                    type={newAccount.address.type}
                    placeholder={newAccount.address.title}
                    onChange={handleInput}
                    autocomplete="off"
                  />
                </div>
                <div className="col col-full mt-8">
                  <div className="col col-half pr-4">
                    <select
                      className="form-control"
                      name="gender"
                      value={newAccount.gender.value}
                      onChange={handleInput}
                    >
                      <option value={true}>Nam</option>
                      <option value={false}>Nữ</option>
                    </select>
                  </div>
                  <div className="col col-half pl-4">
                    <select
                      className="form-control"
                      name="my_class"
                      value={newAccount.my_class.value}
                      onChange={handleInput}
                      disabled={
                        newAccount.group.filter(
                          (ele) => ele.name === "sinhvien_group"
                        ).length === 0
                      }
                    >
                      {class_in_university.map((value, index) => {
                        return (
                          <option key={index} value={value.id}>
                            {value.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col col-full mt-8">
                  <select
                    className="form-control"
                    name="faculty"
                    value={newAccount.faculty.value}
                    onChange={handleInput}
                    disabled={
                      newAccount.group.filter(
                        (ele) => ele.name === "sinhvien_group"
                      ).length === 0
                    }
                  >
                    {faculty.map((value, index) => {
                      return (
                        <option key={index} value={value.id}>
                          {value.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col col-full mt-8">
                  <div className="col col-half pr-4">
                    <select
                      className="form-control"
                      name="position"
                      value={newAccount.position.value}
                      onChange={handleInput}
                    >
                      {position.map((value, index) => {
                        return (
                          <option key={index} value={value.id}>
                            {value.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col col-half pl-4">
                    <select
                      className="form-control"
                      name="area"
                      value={newAccount.area.value}
                      onChange={handleInput}
                      disabled={
                        newAccount.group.filter(
                          (ele) => ele.name === "sinhvien_group"
                        ).length > 0
                      }
                    >
                      {area.map((value, index) => {
                        return (
                          <option key={index} value={value.id}>
                            {value.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col col-full mt-8">
                  <FormError
                    isHidden={newAccount.username.isHidden}
                    errorMessage={newAccount.username.errorMessage}
                  />
                  <InputField
                    name="username"
                    isValid={newAccount.username.isValid}
                    value={newAccount.username.value}
                    type={newAccount.username.type}
                    placeholder={newAccount.username.title}
                    onChange={handleInput}
                    autocomplete="off"
                  />
                </div>
                <div className="col col-full mt-8">
                  <div className="col col-half pr-4">
                    <FormError
                      isHidden={
                        newAccount.password.isHidden ||
                        newAccount.confirm.isHidden
                      }
                      errorMessage={newAccount.password.errorMessage}
                    />
                  </div>
                  <div className="col col-half pl-4">
                    <FormError
                      isHidden={
                        newAccount.password.value === newAccount.confirm.value
                      }
                      errorMessage={newAccount.confirm.errorMessage}
                    />
                  </div>
                </div>
                <div className="col col-full mt-8">
                  <div className="col col-half pr-4">
                    <InputField
                      name="password"
                      isValid={newAccount.password.isValid}
                      value={newAccount.password.value}
                      type={newAccount.password.type}
                      placeholder={newAccount.password.title}
                      onChange={handleInput}
                      autocomplete="off"
                    />
                  </div>
                  <div className="col col-half pl-4">
                    <InputField
                      name="confirm"
                      isValid={
                        newAccount.confirm.isValid ||
                        newAccount.password.value === newAccount.confirm.value
                      }
                      value={newAccount.confirm.value}
                      type={newAccount.confirm.type}
                      placeholder={newAccount.confirm.title}
                      onChange={handleInput}
                      autocomplete="off"
                    />
                  </div>
                  <div className="col col-full mt-8">
                    <ReactTags
                      name="group"
                      tags={newAccount.group}
                      suggestions={permission.group}
                      onAddition={handleGroupAddition}
                      onDelete={handleGroupDelete}
                      placeholderText="Thêm group"
                    />
                  </div>
                  <div className="col col-full mt-8">
                    <ReactTags
                      name="permission"
                      tags={newAccount.permission}
                      suggestions={permission.permission}
                      onAddition={handlePermissionAddition}
                      onDelete={handlePermissionDelete}
                      placeholderText="Thêm quyền"
                    />
                  </div>
                </div>
              </div>
              <div className="col col-full mt-24">
                <div className="col col-half">
                  <Button
                    type="normal-red"
                    content="HỦY"
                    isDisable={false}
                    onClick={hideModal}
                  />
                </div>
                <div className="col col-half">
                  <Button
                    type="normal-ubg"
                    content="LƯU"
                    isDisable={false}
                    onClick={onSave}
                  />
                </div>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
}
