import "react-tabs/style/react-tabs.css";
import React from "react";
import { NavLink } from "react-router-dom";
import * as ROUTER from "../../utilities/constants/router";

const Overview = (Component) => (props) => {
  return (
    <React.Fragment>
      <div className="style-financial-container">
        <div className="col col-full pl-16 pr-16 mb-16">
          <div className="mr-16" style={{ display: "inline", width: "200px" }}>
            <NavLink
              to={`${ROUTER.ROUTE_OVERVIEW}${ROUTER.ROUTER_SUMMARY}`}
              style={{ textDecoration: "none" }}
              activeClassName="style-activeNavSublink"
              className="style-navSubLink bold-text"
            >
              <span>Thống kê</span>
            </NavLink>
          </div>
          <div className="mr-16" style={{ display: "inline", width: "200px" }}>
            <NavLink
              to={`${ROUTER.ROUTE_OVERVIEW}${ROUTER.ROUTER_NOTIFICATION}`}
              style={{ textDecoration: "none" }}
              activeClassName="style-activeNavSublink"
              className="style-navSubLink bold-text"
            >
              <span>Thông báo</span>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="col col-full pl-24 pr-24 pt-16">
        <Component {...props} />
      </div>
    </React.Fragment>
  );
};
export default Overview;
