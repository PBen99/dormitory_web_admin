import React from "react";
import { useHistory } from "react-router";
import * as ROUTER from "../../utilities/constants/router";
const Permissionless = () => {
  const history = useHistory();
  function login() {
    localStorage.clear();
    history.push(`${ROUTER.ROUTE_LOGIN}`);
  }
  return (
    <div className="pt-48 mg-auto">
      <h2 className="mb-16">
        Không cho phép truy cập trang này,{" "}
        <span
          className="text-is-blue"
          style={{ cursor: "pointer" }}
          onClick={login}
        >
          đăng nhập
        </span>{" "}
        lại.
      </h2>
    </div>
  );
};
export default Permissionless;
