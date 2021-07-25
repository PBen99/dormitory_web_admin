import * as types from "../constants";

const initialState = {
  data: {},
  error: {},
  response:{},
  loading: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.LOGIN_API:
    case types.SEND_EMAIL_API:
    case types.GET_CHECK_EXPIRATION:
    case types.RESET_PASSWORD:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.LOGIN_API_SUCCEED:
      return {
        ...state,
        data: actions.payload,
        loading: false,
      };
    case types.GET_CHECK_EXPIRATION_SUCCEED:
      return {
        ...state,
        response: actions.payload,
        loading: false,
      };
    case types.LOGIN_API_FAIL:
    case types.GET_CHECK_EXPIRATION_FAIL:
    case types.RESET_PASSWORD_FAIL:
    case types.RESET_PASSWORD_SUCCEED:
    case types.SEND_EMAIL_API_SUCCEED:
    case types.SEND_EMAIL_API_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
