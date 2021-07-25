import * as types from "../constants";
import store from "../store";

const REACT_APP_BASE_API = process.env.REACT_APP_BASE_URL;

export async function profile(resolve = () => {}) {
  store.dispatch({
    type: types.GET_PROFILE_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}account/get-user-profile/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    resolve(data);
    store.dispatch({
      payload: data,
      type: types.GET_PROFILE_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_PROFILE_API_FAIL,
    });
  }
}
export const actFetchUserNavigation = (user) => {
  return {
    type: types.FETCH_NAV_USER,
    user,
  };
};
export async function updateProfile(profile, resolve = () => {}) {
  store.dispatch({
    type: types.POST_UPDATE_MY_PROFILE_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}account/update-user-profile/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(profile),
      }
    );
    const data = await response.json();
    resolve(data);
    store.dispatch({
      payload: data,
      type: types.POST_UPDATE_MY_PROFILE_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.POST_UPDATE_MY_PROFILE_API_FAIL,
    });
  }
}
