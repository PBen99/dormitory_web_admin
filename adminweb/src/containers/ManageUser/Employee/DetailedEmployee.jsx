import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDetailedEmployee } from "../../../redux/actions/humanResource";
import avatar from "../../../assets/images/user/default-user.png";
import Loader from "../../../components/common/Loader";

const DetailedEmployee = () => {
  const { employeeID } = useParams();

  const [employeeState, setEmployee] = useState();

  const loader = useSelector((state) => state.humanResource.loading);

  useEffect(() => {
    getDetailedEmployee(employeeID, (output) => {
      if (output) {
        window.scrollTo(0, 0);
        setEmployee(output);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pd-16" style={{ height: "85vh" }}>
      {loader ? (
        <div className="align-item-ct">
          <Loader />
        </div>
      ) : (
        <div>
          {employeeState && (
            <div>
              <div className="col col-third justify-content-ct">
                <div className="col style-profile-avatar mt-16">
                  <img src={avatar} alt="avatar" />
                </div>
              </div>
              <div className="col col-two-third style-lg-box bg-color-white">
                <div className="col col-full align-item-ct">
                  <div className="col col-half pl-16">
                    <h2 className="pd-16">Thông tin nhân viên</h2>
                    <div className="col col-full ml-8">
                      <span className="text-is-purple-gradient style-profile-name">
                        {employeeState?.first_name} {employeeState?.last_name}
                      </span>
                    </div>
                    <div className="col col-full mt-8">
                      <i className="fi-rr-heart pr-16"></i>
                      <span>
                        {employeeState?.profile?.gender === true ? "Nam" : "Nữ"}
                      </span>
                    </div>
                    <div className="col col-full mt-8">
                      <i className="fi-rr-marker pr-16"></i>
                      <span>{employeeState?.profile?.address}</span>
                    </div>
                    <div className="col col-full mt-8">
                      <i className="fi-rr-envelope pr-16"></i>
                      <span>{employeeState?.email}</span>
                    </div>
                    <div className="col col-full mt-8">
                      <i className="fi-rr-bold pr-16"></i>
                      <span>{employeeState?.profile?.birthday}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col col-full style-lg-box bg-color-white style-profile-room mt-48 pd-24">
                <span className="style-notiTitle">Thông tin công việc</span>
                <div className="col col-full pt-8">
                  <span className="text-is-bold">Chức vụ: </span>
                  <span>{employeeState?.profile?.position?.name}</span>
                </div>
                <div className="col col-full pt-8">
                  <span className="text-is-bold">Mã số nhân viên: </span>
                  <span>{employeeState?.username}</span>
                </div>
                <div className="col col-full pt-8">
                  <span className="text-is-bold">Khu: </span>
                  <span>{employeeState?.profile?.area?.name}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default DetailedEmployee;
