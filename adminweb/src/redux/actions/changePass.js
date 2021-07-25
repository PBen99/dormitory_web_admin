import * as types from "../constants";
import store from "../store";
export async function changePass(data, resolve = () => {}) {
  store.dispatch({
    type: types.CHANGE_PASS_API,
  });
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/account/change-password/",
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
      type: types.CHANGE_PASS_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.CHANGE_PASS_API_FAIL,
    });
  }
}
