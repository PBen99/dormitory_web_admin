import React from "react";
import { useHistory } from "react-router-dom";
import * as ROUTER from "../../../utilities/constants/router";
import avatar from "../../../assets/images/user/employee.jpg";
const EmployeeTag = (props) => {
  const { slug, name, email, phone } = props;

  const history = useHistory();

  function gotoPage(path) {
    window.scrollTo(0, 0);
    history.push(path);
  }

  return (
    <div
      className="col col-full style-lg-box bg-color-white style-employee-tag"
      onClick={() =>
        gotoPage(
          `${ROUTER.ROUTE_MANAGE_USER}${ROUTER.ROUTE_DETAILED_EMPLOYEE}/${slug}`
        )
      }
    >
      <div className="col col-full justify-content-ct style-avatar-container">
        <div className="col col-half mg-16">
          <img className="style-img" src={avatar} alt="" />
        </div>
      </div>
      <div className="col col-full justify-content-ct pd-8">
        <p className="bold-text text-20">{name}</p>
      </div>
      <div>
        <p className="mg-8">
          <i className="fi-sr-smartphone text-is-pink" />
          <span className="bold-text pl-8 text-12 text-is-grey">{phone}</span>
        </p>
        <p className="mg-8">
          <i className="fi-sr-envelope text-is-pink" />
          <span className="bold-text pl-8 text-12 text-is-grey">{email}</span>
        </p>
      </div>
    </div>
  );
};
export default EmployeeTag;
