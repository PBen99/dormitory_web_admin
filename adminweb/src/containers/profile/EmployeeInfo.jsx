import React from "react";
const EmployeeInfo = (props) => {
  const { position, username, area } = props;


  return (
    <div className="col col-full style-lg-box bg-color-white style-profile-room">
      <span className="style-notiTitle">Thông tin công việc</span>
      <div className="col col-full pt-8 pl-16">
        <span>Chức vụ: </span>
        <span>{position}</span>
      </div>
      <div className="col col-full pt-8 pl-16">
        <span>Mã số nhân viên: </span>
        <span>{username}</span>
      </div>
      <div className="col col-full pt-8 pl-16">
        <span>Khu: </span>
        <span>{area}</span>
      </div>
    </div>
  );
};
export default EmployeeInfo;
