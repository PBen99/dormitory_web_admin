import { combineReducers } from "redux";
import login from "./login";
import overview from "./overview";
import profile from "./profile";
import changePass from "./changePass";
import financial from "./financial";
import humanResource from "./humanResource";
import account from "./account";

export default combineReducers({
  login,
  overview,
  profile,
  changePass,
  account,
  financial,
  humanResource,
});
