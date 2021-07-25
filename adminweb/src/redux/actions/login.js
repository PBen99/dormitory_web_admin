import * as types from "../constants";
import store from "../store";

const REACT_APP_BASE_API = process.env.REACT_APP_BASE_URL;

export async function login(user, resolve = () => {}) {
  store.dispatch({
    type: types.LOGIN_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    const isOk = response.ok;
    resolve(data, isOk);
    store.dispatch({
      payload: data,
      type: types.LOGIN_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.LOGIN_API_FAIL,
    });
  }
}
export async function sendEmail(data, resolve = () => {}) {
  store.dispatch({
    type: types.SEND_EMAIL_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}auth/forgot-password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.SEND_EMAIL_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.SEND_EMAIL_API_FAIL,
    });
  }
}

export async function resetPass(data, uuid, token, resolve = () => {}) {
  store.dispatch({
    type: types.RESET_PASSWORD,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}auth/forgot-password/${uuid}/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.RESET_PASSWORD_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.RESET_PASSWORD_FAIL,
    });
  }
}

export async function checkExpiration(uuid, token, resolve = () => {}) {
  store.dispatch({
    type: types.GET_CHECK_EXPIRATION,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}auth/forgot-password/${uuid}/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_CHECK_EXPIRATION_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_CHECK_EXPIRATION_FAIL,
    });
  }
}
