import moment from "moment";
import * as AlertMessage from "../AlertMessage";
function getRevenueRender(data) {
  return {
    publicId: { value: data ? data.public_id : null },
    name: {
      value: data ? data.name : "",
      title: "Tên",
      type: "text",
      validateType: "string",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.NAME_INVALID,
    },
    type_revenue: {
      value: data ? data.type.id : 1,
      title: "Loại",
    },
    description: {
      value: data ? data.description : "",
      title: "Mô tả",
      type: "text",
    },
    amount: {
      value: data ? data.price : 0,
      title: "Tổng tiền",
      type: "number",
      validateType: "money",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.INCORRECT_FORMAT,
    },
    user_recieve: {
      value: data ? parseInt(data.userReceive.id) : 7,
      title: "Người thu",
    },
    date_recieve: {
      value: data
        ? moment(data.receivedDate).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD"),
      title: "Thời gian thu",
      type: "date",
    },
    time_recieve: {
      value: data
        ? moment(data.receivedDate).format("hh:mm")
        : moment(new Date()).format("hh:mm"),
      title: "Thời gian thu",
      type: "time",
    },
  };
}

function getExpenseRender(data) {
  return {
    publicId: { value: data ? data.public_id : null },
    name: {
      value: data ? data.name : "",
      title: "Tên",
      type: "text",
      validateType: "string",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.NAME_INVALID,
    },
    type_expense: {
      value: data ? data.type.id : 1,
      title: "Loại",
    },
    description: {
      value: data ? data.description : "",
      title: "Mô tả",
      type: "text",
    },
    price: {
      value: data ? data.price : 0,
      title: "Tổng tiền",
      type: "number",
      validateType: "money",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.INCORRECT_FORMAT,
    },
    user_paid: {
      value: data ? parseInt(data.userPaid.id) : 7,
      title: "Người thu",
    },
    date_paid: {
      value: data
        ? moment(data.paidDate).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD"),
      title: "Thời gian thu",
      type: "date",
    },
    time_paid: {
      value: data
        ? moment(data.paidDate).format("hh:mm")
        : moment(new Date()).format("hh:mm"),
      title: "Thời gian thu",
      type: "time",
    },
  };
}

function sendExpense(data) {
  return {
    name: data.name.value,
    type_expense: parseInt(data.type_expense.value),
    description: data.description.value,
    price: parseFloat(data.price.value),
    user_paid: parseInt(data.user_paid.value),
    time_paid: data.date_paid.value + " " + data.time_paid.value + ":00",
  };
}

function sendRevenue(data) {
  return {
    name: data.name.value,
    type_revenue: parseInt(data.type_revenue.value),
    description: data.description.value,
    amount: parseFloat(data.amount.value),
    user_recieve: parseInt(data.user_recieve.value),
    time_recieve:
      data.date_recieve.value + " " + data.time_recieve.value + ":00",
  };
}
export { getExpenseRender, getRevenueRender, sendExpense, sendRevenue };
