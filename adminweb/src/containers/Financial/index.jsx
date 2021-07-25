import React from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./styles.css";
import { NavLink } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import * as ROUTER from "../../utilities/constants/router";

const Financial = (Component) => (props) => {
  return (
    <React.Fragment>
      <div className="style-financial-container">
        <div className="col col-full pl-16 pr-16 mb-16">
          <div className="mr-16" style={{ display: "inline", width: "200px" }}>
            <NavLink
              to={`${ROUTER.ROUTE_MANAGE_FINANCIAL}${ROUTER.ROUTE_BUDGET}`}
              style={{ textDecoration: "none" }}
              activeClassName="style-activeNavSublink"
              className="style-navSubLink bold-text"
            >
              Thu chi
            </NavLink>
          </div>
          <div className="mr-16" style={{ display: "inline", width: "200px" }}>
            <NavLink
              to={`${ROUTER.ROUTE_MANAGE_FINANCIAL}${ROUTER.ROUTE_WATER_ELECTRICAL}`}
              style={{ textDecoration: "none" }}
              activeClassName="style-activeNavSublink"
              className="style-navSubLink bold-text"
            >
              <span>Tiền điện nước</span>
            </NavLink>
          </div>
          <div className="mr-16" style={{ display: "inline", width: "200px" }}>
            <NavLink
              to={`${ROUTER.ROUTE_MANAGE_FINANCIAL}${ROUTER.ROUTE_CONTRACTS}`}
              style={{ textDecoration: "none" }}
              activeClassName="style-activeNavSublink"
              className="style-navSubLink bold-text"
            >
              <span>Hóa đơn</span>
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

export default Financial;
