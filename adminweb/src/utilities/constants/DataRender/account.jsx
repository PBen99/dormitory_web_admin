import * as AlertMessage from "../AlertMessage";
import moment from "moment";

function getEmptyAccount() {
  return {
    password: {
      value: "",
      title: "Mật khẩu",
      type: "password",
      validateType: "password",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.PASSWORD_INVALID,
    },
    confirm: {
      value: "",
      title: "Xác nhận mật khẩu",
      type: "password",
      validateType: "password",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.PASSWORD_DIFFERENT,
    },
    username: {
      value: "",
      title: "Tên đăng nhập",
      type: "text",
      validateType: "string",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.BLANK_NOT_ALLOWED,
    },
    permission: [],
    group: [],
    position: { value: 1, title: "Phòng ban" },
    area: { value: 1, title: "Khu" },
    faculty: { value: 1, title: "Khoa" },
    my_class: { value: 1, title: "Lớp" },
    firstName: {
      value: "",
      title: "Tên",
      type: "text",
      validateType: "string",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.NAME_INVALID,
    },
    lastName: {
      value: "",
      title: "Họ",
      type: "text",
      validateType: "string",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.NAME_INVALID,
    },
    email: {
      value: "",
      title: "Email",
      type: "text",
      validateType: "email",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.EMAIL_INVALID,
    },
    birthday: {
      value: moment(new Date()).format("YYYY-MM-DD"),
      title: "Ngày sinh",
      type: "date",
      isValid: true,
      isHidden: true,
    },
    address: {
      value: "",
      title: "Địa chỉ",
      type: "text",
      validateType: "string",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.BLANK_NOT_ALLOWED,
    },
    phone: {
      value: "",
      title: "Số điện thoại",
      type: "tel",
      validateType: "phone",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.PHONE_NUMBER_INVALID,
    },
    identify_card: {
      value: "",
      title: "CMND",
      type: "tel",
      isValid: true,
      isHidden: true,
      validateType: "idCard",
      errorMessage: AlertMessage.IDENTIFICATION_INVALID,
    },
    gender: {
      title: "Giới tính",
      value: true,
      field: {
        [true]: "Nam",
        [false]: "Nữ",
      },
    },
  };
}

function renderAccount(data) {
  return {
    username: {
      value: data.user.username,
      title: "Tên đăng nhập",
      type: "text",
      validateType: "string",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.BLANK_NOT_ALLOWED,
    },
    permission: data.user.permission_list,
    group: data.user.group_list,
    is_active: {
      value: data.user.is_active,
      title: "Kích hoạt",
    },
    position: {
      value: data.position ? data.position.id : 1,
      title: "Phòng ban",
    },
    area: { value: data.area ? data.area.id : 1, title: "Khu" },
    faculty: { value: data.faculty ? data.faculty.id : 1, title: "Khoa" },
    my_class: {
      value: data.my_class ? data.my_class.id : 1,
      title: "Lớp",
    },
    firstName: {
      value: data.user.first_name,
      title: "Tên",
      type: "text",
      validateType: "string",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.NAME_INVALID,
    },
    lastName: {
      value: data.user.last_name,
      title: "Họ",
      type: "text",
      validateType: "string",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.NAME_INVALID,
    },
    email: {
      value: data.user.email,
      title: "Email",
      type: "text",
      validateType: "email",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.EMAIL_INVALID,
    },
    birthday: {
      value: moment(new Date(data.birthday)).format("YYYY-MM-DD"),
      title: "Ngày sinh",
      type: "date",
      isValid: true,
      isHidden: true,
    },
    address: {
      value: data.address,
      title: "Địa chỉ",
      type: "text",
      validateType: "string",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.BLANK_NOT_ALLOWED,
    },
    phone: {
      value: data.phone,
      title: "Số điện thoại",
      type: "tel",
      validateType: "phone",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.PHONE_NUMBER_INVALID,
    },
    identify_card: {
      value: data.identify_card,
      title: "CMND",
      type: "tel",
      isValid: true,
      isHidden: true,
      validateType: "idCard",
      errorMessage: AlertMessage.IDENTIFICATION_INVALID,
    },
    gender: {
      title: "Giới tính",
      value: data.gender,
      field: {
        [true]: "Nam",
        [false]: "Nữ",
      },
    },
  };
}

function getSendData(data) {
  return {
    username: data.username.value,
    password: data.password.value,
    first_name: data.firstName.value,
    last_name: data.lastName.value,
    email: data.email.value,
    is_active: true,
    profile: {
      birthday: data.birthday.value,
      address: data.address.value,
      identify_card: data.identify_card.value,
      gender: data.gender.value,
      area:
        data.group.filter((value) => "sinhvien_group" === value.name).length ===
        0
          ? parseInt(data.area.value, 10)
          : "",
      phone: data.phone.value,
      faculty:
        data.group.filter((value) => "sinhvien_group" === value.name).length ===
        0
          ? ""
          : parseInt(data.faculty.value, 10),
      my_class:
        data.group.filter((value) => "sinhvien_group" === value.name).length ===
        0
          ? ""
          : parseInt(data.my_class.value, 10),
    },
    group_list: data.group.map((value) => {
      return value.id;
    }),
    permission_list: data.permission.map((value) => {
      return value.id;
    }),
  };
}

function getUpdateData(data) {
  return {
    username: data.username.value,
    first_name: data.firstName.value,
    last_name: data.lastName.value,
    email: data.email.value,
    is_active: data.is_active.value,
    profile: {
      birthday: data.birthday.value,
      address: data.address.value,
      identify_card: data.identify_card.value,
      gender: data.gender.value,
      area:
        data.group.filter((value) => "sinhvien_group" === value.name).length ===
        0
          ? parseInt(data.area.value, 10)
          : "",
      phone: data.phone.value,
      faculty:
        data.group.filter((value) => "sinhvien_group" === value.name).length ===
        0
          ? ""
          : parseInt(data.faculty.value, 10),
      my_class:
        data.group.filter((value) => "sinhvien_group" === value.name).length ===
        0
          ? ""
          : parseInt(data.my_class.value, 10),
    },
    group_list: data.group.map((value) => {
      return value.id;
    }),
    permission_list: data.permission.map((value) => {
      return value.id;
    }),
  };
}

export { getEmptyAccount, getSendData, renderAccount, getUpdateData };
