import { getAuth } from "../../utilities/helper";
import * as types from "../constants";

const initialState = {
  personalProfile: {},
  error: {},
  loading: false,
  user: getAuth(),
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_PROFILE_API:
    case types.POST_UPDATE_MY_PROFILE_API:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.GET_PROFILE_API_SUCCEED:
      return {
        ...state,
        personalProfile: actions.payload,
        loading: false,
      };
    case types.GET_PROFILE_API_FAIL:
    case types.POST_UPDATE_MY_PROFILE_API_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    case types.FETCH_NAV_USER: {
      return { ...state, user: actions.user };
    }
    case types.POST_UPDATE_MY_PROFILE_API_SUCCEED:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
