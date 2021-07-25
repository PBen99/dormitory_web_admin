import * as TypeActions from "../constants";

const initialState = {
  notifications: [],
  roomUsage: [],
  currentNotification: {},
  error: {},
  loading: false,
};

function overview(state = initialState, action) {
  switch (action.type) {
    case TypeActions.GET_NOTIFICATIONS_API:
    case TypeActions.GET_USED_ROOM_API:
    case TypeActions.CREATE_NOTIFICATION_API:
    case TypeActions.DELETE_NOTIFICATION_API:
    case TypeActions.UPDATE_NOTIFICATION_API:
    case TypeActions.GET_DETAILED_NOTIFICATION_API:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case TypeActions.GET_DETAILED_NOTIFICATION_API_SUCCEED:
      return {
        ...state,
        loading: false,
        currentNotification: action.payload,
      };
    case TypeActions.GET_NOTIFICATIONS_API_SUCCEED:
      return {
        ...state,
        loading: false,
        notifications: action.payload,
      };
    case TypeActions.GET_USED_ROOM_API_SUCCEED:
      return {
        ...state,
        loading: false,
        roomUsage: action.payload,
      };
    case TypeActions.GET_NOTIFICATIONS_API_FAIL:
    case TypeActions.GET_USED_ROOM_API_FAIL:
    case TypeActions.CREATE_NOTIFICATION_API_FAIL:
    case TypeActions.DELETE_NOTIFICATION_API_FAIL:
    case TypeActions.DELETE_NOTIFICATION_API_SUCCEED:
    case TypeActions.UPDATE_NOTIFICATION_API_SUCCEED:
    case TypeActions.CREATE_NOTIFICATION_API_SUCCEED:
    case TypeActions.UPDATE_NOTIFICATION_API_FAIL:
    case TypeActions.GET_DETAILED_NOTIFICATION_API_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
}
export default overview;
