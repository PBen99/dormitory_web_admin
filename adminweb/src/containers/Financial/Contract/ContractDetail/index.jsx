import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";
import * as ROUTER from "../../../../utilities/constants/router";

import "./styles.css";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { getDetailedContract } from "../../../../redux/actions/financial";
import { isAllowed } from "../../../../utilities/helper";
import Permissionless from "../../../../components/common/Permissionless";
import Loader from "../../../../components/common/Loader";
import { useSelector } from "react-redux";
export default function ContractDetail() {
  let history = useHistory();

  const { contractId } = useParams();

  const [data, setData] = useState();

  const loader = useSelector((state) => state.financial.loading);

  useEffect(() => {
    getDetailedContract(contractId, (output) => {
      console.log(output);
      if (output) {
        setData(output);
      }
    });
  }, []);

  const handleClickBack = () => {
    history.push(`${ROUTER.ROUTE_MANAGE_FINANCIAL}${ROUTER.ROUTE_CONTRACTS}`);
  };

  return (
    <div className="col col-full pl-48 pr-48">
      {!isAllowed("quanlytaichinh_group", "view_contract") ? (
        <div className="align-item-ct">
          <Permissionless />
        </div>
      ) : loader ? (
        <div className="align-item-ct">
          <Loader />
        </div>
      ) : (
        <div>
          {data && (
            <div className="col col-full">
              <h1 id="title">Chi tiết hợp đồng</h1>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickBack}
                style={{ marginBottom: "20px" }}
                startIcon={<ArrowBackIcon></ArrowBackIcon>}
              >
                Trở lại
              </Button>
              <div className="col col-full">
                <table id="contract" className="mg-auto">
                  <thead>
                    <tr>
                      <th
                        style={{ backgroundColor: "green", border: "none" }}
                      ></th>
                      <th
                        style={{ backgroundColor: "green", border: "none" }}
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Phòng</th>
                      <th>{data.room.name}</th>
                    </tr>
                    <tr>
                      <th>Khu</th>
                      <th>{data.room.area.name}</th>
                    </tr>
                    <tr>
                      <th>Loại phòng</th>
                      <th>{data.room.typeroom.name}</th>
                    </tr>
                    <tr>
                      <th>Giá Phòng</th>
                      <th>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(data.room.typeroom.price)}
                      </th>
                    </tr>
                    <tr>
                      <th>Người Thuê</th>
                      <th>{`${data.profile.user.last_name} ${data.profile.user.first_name}`}</th>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <th>{data.profile.user.email}</th>
                    </tr>
                    <tr>
                      <th>Lớp</th>
                      <th>{data.profile.my_class.name}</th>
                    </tr>
                    <tr>
                      <th>Khoa</th>
                      <th>{data.profile.faculty.name}</th>
                    </tr>
                    <tr>
                      <th>Địa chỉ liên lạc</th>
                      <th>{data.profile.address}</th>
                    </tr>
                    <tr>
                      <th>SĐT</th>
                      <th>{data.profile.phone}</th>
                    </tr>
                    <tr>
                      <th>Ngày Kí Hợp Đồng</th>
                      <th>{moment(data.start_at).format("DD/MM/YYYY")}</th>
                    </tr>
                    <tr>
                      <th>Ngày Hết Hạn Hợp Đồng</th>
                      <th>{moment(data.end_at).format("DD/MM/YYYY")}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
