import * as types from "../constants";
import store from "../store";

const REACT_APP_BASE_API = process.env.REACT_APP_BASE_URL;

export async function getAccounts(params, resolve = () => {}) {
  store.dispatch({
    type: types.GET_ACCOUNTS_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}admin/account/?${params}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_ACCOUNTS_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_ACCOUNTS_API_FAIL,
    });
  }
}

export async function getGroupAndPermission(resolve = () => {}) {
  store.dispatch({
    type: types.GET_GROUP_AND_PERMISSION_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}permission/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_GROUP_AND_PERMISSION_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_GROUP_AND_PERMISSION_API_FAIL,
    });
  }
}

export async function getFaculty(resolve = () => {}) {
  store.dispatch({
    type: types.GET_FACULTY_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}faculty/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_FACULTY_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_FACULTY_API_FAIL,
    });
  }
}

export async function getClass(resolve = () => {}) {
  store.dispatch({
    type: types.GET_CLASS_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}class/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_CLASS_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_CLASS_API_FAIL,
    });
  }
}

export async function getPosition(resolve = () => {}) {
  store.dispatch({
    type: types.GET_POSITION_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}position/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_POSITION_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_POSITION_API_FAIL,
    });
  }
}

export async function getArea(resolve = () => {}) {
  store.dispatch({
    type: types.GET_AREA_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}area/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_AREA_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_AREA_API_FAIL,
    });
  }
}

export async function getDetailedAccount(publicId, resolve = () => {}) {
  store.dispatch({
    type: types.GET_DETAILED_ACCOUNT_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}admin/account/${publicId}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_DETAILED_ACCOUNT_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_DETAILED_ACCOUNT_API_FAIL,
    });
  }
}
export async function createAccount(data, resolve = () => {}) {
  store.dispatch({
    type: types.CREATE_ACCOUNT,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}admin/account/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.CREATE_ACCOUNT_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.CREATE_ACCOUNT_API_FAIL,
    });
  }
}
export async function updateAccount(publicId, data, resolve = () => {}) {
  store.dispatch({
    type: types.UPDATE_ACCOUNT,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}admin/account/${publicId}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
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
      type: types.UPDATE_ACCOUNT_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.UPDATE_ACCOUNT_API_FAIL,
    });
  }
}

export async function getNumberOfAccount(resolve = () => {}) {
  store.dispatch({
    type: types.GET_NUMBER_OF_ACCOUNT,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}admin/count-profile/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_NUMBER_OF_ACCOUNT_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_NUMBER_OF_ACCOUNT_FAIL,
    });
  }
}
export async function getRoombyArea(slug, resolve = () => {}) {
  store.dispatch({
    type: types.GET_ROOMS_BY_AREA_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}rooms/get-room-not-pagination/${slug}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_ROOMS_BY_AREA_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_ROOMS_BY_AREA_API_FAIL,
    });
  }
}
