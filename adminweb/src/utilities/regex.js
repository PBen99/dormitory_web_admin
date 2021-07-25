const validate = {
  phone: (value) => {
    const regex = /^[0-9]{10,11}$/;
    return regex.test(value);
  },

  string: (value) => {
    const regex = /\w+/;
    return regex.test(value);
  },

  email: (value) => {
    const regex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    return regex.test(value);
  },
  idCard: (value) => {
    const regex = /^[0-9]+$/;
    return regex.test(value);
  },
  stringAndNumber: (value) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(value);
  },
  password: (value) => {
    const regex = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/;
    return regex.test(value);
  },
  money: (value) => {
    const regex = /^[0-9]+(\.[0-9]{1,2})?$/;
    return regex.test(value);
  },
};

export default validate;
