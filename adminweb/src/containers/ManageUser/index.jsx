import "react-tabs/style/react-tabs.css";
import React from "react";
import { NavLink } from "react-router-dom";
import * as ROUTER from "../../utilities/constants/router";

const ManageUser = (Component) => (props) => {
  return (
    <React.Fragment>
      <div className="style-financial-container">
        <div className="col col-full pl-16 pr-16 mb-16">
          <div className="mr-16" style={{ display: "inline", width: "200px" }}>
            <NavLink
              to={`${ROUTER.ROUTE_MANAGE_USER}${ROUTER.ROUTE_STUDENTS}`}
              style={{ textDecoration: "none" }}
              activeClassName="style-activeNavSublink"
              className="style-navSubLink bold-text"
            >
              Sinh viên
            </NavLink>
          </div>
          <div className="mr-16" style={{ display: "inline", width: "200px" }}>
            <NavLink
              to={`${ROUTER.ROUTE_MANAGE_USER}${ROUTER.ROUTE_EMPLOYEES}`}
              style={{ textDecoration: "none" }}
              activeClassName="style-activeNavSublink"
              className="style-navSubLink bold-text"
            >
              <span>Nhân viên</span>
            </NavLink>
          </div>
          <div className="mr-16" style={{ display: "inline", width: "200px" }}>
            <NavLink
              to={`${ROUTER.ROUTE_MANAGE_USER}${ROUTER.ROUTE_REGISTRATIONS}`}
              style={{ textDecoration: "none" }}
              activeClassName="style-activeNavSublink"
              className="style-navSubLink bold-text"
            >
              <span>Yêu cầu đăng kí</span>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="col col-full">
        <Component {...props} />
      </div>
    </React.Fragment>
  );
};
export default ManageUser;
