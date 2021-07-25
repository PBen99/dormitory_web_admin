import * as AlertMessage from "../AlertMessage";
import moment from "moment";
function getHandledEmployeeDataRender(origin) {
  return {
    firstName: {
      value: origin.first_name,
      title: "Tên",
      type: "text",
      validateType: "string",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.NAME_INVALID,
    },
    lastName: {
      value: origin.last_name,
      title: "Họ",
      type: "text",
      validateType: "string",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.NAME_INVALID,
    },
    email: {
      value: origin.email,
    },
    birthday: {
      value: moment(new Date(origin.profile.birthday)).format("YYYY-MM-DD"),
      title: "Ngày sinh",
      type: "date",
      isValid: true,
      isHidden: true,
    },
    address: {
      value: origin.profile.address,
      title: "Địa chỉ",
      type: "text",
      isValid: true,
      isHidden: true,
    },
    phone: {
      value: origin.profile.phone,
      title: "Số điện thoại",
      type: "tel",
      validateType: "phone",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.PHONE_NUMBER_INVALID,
    },
    identification: {
      value: origin.profile.identify_card,
      title: "CMND",
      type: "tel",
      isValid: true,
      isHidden: true,
      validateType: "idCard",
      errorMessage: AlertMessage.IDENTIFICATION_INVALID,
    },
    gender: {
      title: "Giới tính",
      value: origin.profile.gender,
      field: {
        [true]: "Nam",
        [false]: "Nữ",
      },
    },
  };
}

function getRawEmployeeDataRender(data) {
  return {
    email: data.email.value,
    first_name: data.firstName.value,
    last_name: data.lastName.value,
    profile: {
      address: data.address.value,
      gender: data.gender.value,
      birthday: data.birthday.value,
      identify_card: data.identification.value,
      phone: data.phone.value,
    },
  };
}

export { getHandledEmployeeDataRender, getRawEmployeeDataRender };
