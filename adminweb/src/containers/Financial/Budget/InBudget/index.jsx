/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  createRevenue,
  deleteRevenue,
  getRevenue,
  getRevenueType,
  getUserBudget,
  updateRevenue,
} from "../../../../redux/actions/financial";
import Pagination from "../../../../components/common/Pagination";
import Button from "../../../../components/common/Button";
import FormError from "../../../../components/common/FormError";
import InputField from "../../../../components/common/InputField";
import "./styles.css";
import {
  getRevenueRender,
  sendRevenue,
} from "../../../../utilities/constants/DataRender/budget";
import Popup from "reactjs-popup";
import queryString from "querystring";
import validate from "../../../../utilities/regex";
import Alertness from "../../../../components/common/Alertness";
import * as ALERTMESSAGE from "../../../../utilities/constants/AlertMessage";
import * as AlertApi from "../../../../utilities/constants/APIAlertMessage";
import Loader from "../../../../components/common/Loader";
import Permissionless from "../../../../components/common/Permissionless";
import { isAllowed } from "../../../../utilities/helper";

export default function InBudget() {
  const loader = useSelector((state) => state.financial.loading);

  const [dataInBudget, setDataInBudget] = useState([]);

  const [selection, setSelection] = useState(null);

  const [isUpdate, setUpdate] = useState(false);

  const [newBudget, setBudget] = useState(null);

  const [open, setOpen] = useState({
    isShow: false,
    action: "",
  });

  const [notification, setNotification] = useState({
    type: "",
    content: "",
  });

  const [openAlert, setOpenAlert] = useState(false);

  const onCloseAlert = () => setOpenAlert(false);

  const onOpenAlert = () => setOpenAlert(true);

  const onClose = () => setOpen({ ...open, isShow: false });

  const onOpen = (action) => setOpen({ isShow: true, action: action });

  const [openConfirm, setOpenConfirm] = useState({
    isShow: false,
    value: "",
  });

  const onCloseConfirm = () =>
    setOpenConfirm({ ...openConfirm, isShow: false });

  const onOpenConfirm = (value) =>
    setOpenConfirm({ ...openConfirm, isShow: true, value: value });

  function openAdd() {
    setBudget(getRevenueRender(null));
    onOpen("add");
  }

  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 20,
    totals: 1,
  });

  const [filter, setFilter] = useState({
    page: 1,
  });

  useEffect(() => {
    let mounted = true;

    const paramsString = queryString.stringify(filter);

    getRevenue(paramsString, (output) => {
      if (output) {
        const pagination = {
          page: output.current_page,
          page_size: output.page_size,
          totals: output.totals,
        };

        const data = output.results.map((value, index) => {
          return {
            order: index + 1,
            public_id: value.public_id,
            name: value.name,
            type: {
              value: value.type_revenue.name,
              id: value.type_revenue.id,
            },
            description: value.description,
            createdBy:
              value.created_by.first_name + " " + value.created_by.last_name,
            price: value.amount,
            createdDate: new Date(value.created_at),
            receivedDate: new Date(value.time_recieve),
            userReceive: {
              value:
                value.user_recieve.user.first_name +
                " " +
                value.user_recieve.user.last_name,
              id: value.user_recieve.user.id,
            },
          };
        });

        if (mounted) {
          setPagination(pagination);
          setDataInBudget(data);
        }
      }
    });
  }, [isUpdate, filter]);

  useEffect(() => {
    let mounted = true;
    let selection = {
      revenueType: [],
      recievedUser: [],
    };

    getRevenueType((output) => {
      if (output) {
        if (mounted) {
          selection.revenueType = output;
        }
      }
    });

    getUserBudget((output) => {
      if (output) {
        if (mounted) {
          selection.recievedUser = output;
        }
      }
    });

    setSelection(selection);
    return () => (mounted = false);
  }, []);

  function handlePageChange(newPage) {
    setFilter({ ...filter, page: newPage });
  }

  function validateBudget() {
    let tempEditData = { ...newBudget };

    Object.keys(newBudget).forEach((value) => {
      if (newBudget[value].validateType) {
        if (!validate[newBudget[value].validateType](newBudget[value].value)) {
          tempEditData[value].isValid = false;
          tempEditData[value].isHidden = false;
        } else {
          tempEditData[value].isValid = true;
          tempEditData[value].isHidden = true;
        }
      }
      setBudget(tempEditData);
    });
  }

  function handleInput(event) {
    const { name, value } = event.target;
    const newState = { ...newBudget[name] };
    newState.value = value;
    setBudget({ ...newBudget, [name]: newState });
  }

  function saveBudget() {
    validateBudget();
    if (newBudget.name.isValid && newBudget.amount.isValid) {
      const data = sendRevenue(newBudget);

      if (open.action === "add") {
        createRevenue(data, (output) => {
          if (output) {
            switch (output.status) {
              case AlertApi.STATUS_SUCCESS:
                setNotification({
                  type: "type-success",
                  content: ALERTMESSAGE.CREATE_SUCCESSFULLY,
                });
                setUpdate((prev) => !prev);
                break;
              default:
                setNotification({
                  type: "type-error",
                  content: ALERTMESSAGE.SYSTEM_ERROR,
                });
                break;
            }
          } else {
            setNotification({
              type: "type-error",
              content: ALERTMESSAGE.SYSTEM_ERROR,
            });
          }
          onOpenAlert();
        });
      } else {
        updateRevenue(data, newBudget.publicId.value, (output) => {
          if (output) {
            switch (output.status) {
              case AlertApi.STATUS_SUCCESS:
                setNotification({
                  type: "type-success",
                  content: ALERTMESSAGE.UPDATE_PROFILE_SUCCESSFULLY,
                });
                setUpdate((prev) => !prev);
                break;
              default:
                setNotification({
                  type: "type-error",
                  content: ALERTMESSAGE.SYSTEM_ERROR,
                });
                break;
            }
          } else {
            setNotification({
              type: "type-error",
              content: ALERTMESSAGE.SYSTEM_ERROR,
            });
          }
          onOpenAlert();
        });
      }
    }
  }

  function handleEdit(value) {
    setBudget(getRevenueRender(value));
    onOpen("edit");
  }

  function handleConfirm(event, value) {
    event.stopPropagation();
    setNotification({
      type: "type-warning",
      content: ALERTMESSAGE.REMOVAL_CONFIRM,
    });
    onOpenConfirm(value);
  }

  function handleDelete() {
    deleteRevenue(openConfirm.value, (output) => {
      if (output) {
        alert(output.notification);
        setUpdate((prev) => !prev);
      }
    });
    onCloseConfirm();
  }
  return (
    <div>
      {!isAllowed("quanlytaichinh_group", "view_revenue") ? (
        <div className="align-item-ct">
          <Permissionless />
        </div>
      ) : loader ? (
        <div className="align-item-ct">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="col col-full pd-16">
            <div className="pb-16">
              <Button
                type="normal-blue"
                content="Thêm"
                onClick={openAdd}
                isDisable={!isAllowed("quanlytaichinh_group", "add_revenue")}
              />
            </div>
            {dataInBudget && (
              <div>
                <table className="col col-full style-lg-box bg-color-white">
                  <thead className="col col-full">
                    <tr className="col col-full">
                      <th className="col col-15 bold-text pl-4 pr-4 pt-16 pb-16">
                        STT
                      </th>
                      <th className="col col-10 bold-text pl-4 pr-4 pt-16 pb-16">
                        Loại
                      </th>
                      <th className="col col-6 bold-text pl-4 pr-4 pt-16 pb-16">
                        Mô tả
                      </th>
                      <th className="col col-6 bold-text pl-4 pr-4 pt-16 pb-16">
                        Tạo bởi
                      </th>
                      <th className="col col-10 bold-text pl-4 pr-4 pt-16 pb-16">
                        Tổng tiền
                      </th>
                      <th className="col col-10 bold-text pl-4 pr-4 pt-16 pb-16">
                        Ngày tạo
                      </th>
                      <th className="col col-10 bold-text pl-4 pr-4 pt-16 pb-16">
                        Ngày thu
                      </th>
                      <th className="col col-10 bold-text pl-4 pr-4 pt-16 pb-16">
                        Người thu
                      </th>
                      <th className="col col-10 bold-text pl-4 pr-4 pt-16 pb-16">
                        Xóa đơn
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataInBudget.map((value, index) => {
                      return (
                        <tr
                          key={index}
                          className="col col-full style-tr-hightlight"
                          onClick={() => handleEdit(value)}
                        >
                          <td className="col col-15 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                            #{value.order}
                          </td>
                          <td className="col col-10 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                            {value.type.value}
                          </td>
                          <td className="col col-6 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                            {value.description}
                          </td>
                          <td className="col col-6 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                            {value.createdBy}
                          </td>
                          <td className="col col-10 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                            {value.price}
                          </td>
                          <td className="col col-10 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                            {moment(value.createdDate).format(
                              "DD-MM-YYYY hh:mm:ss a"
                            )}
                          </td>
                          <td className="col col-10 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                            {moment(value.receivedDate).format(
                              "DD-MM-YYYY hh:mm:ss a"
                            )}
                          </td>
                          <td className="col col-10 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                            {value.userReceive.value}
                          </td>
                          <td className="col col-10 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                            <Button
                              size="small"
                              type="normal-red"
                              content="Xóa"
                              isDisable={false}
                              onClick={(e) => handleConfirm(e, value.public_id)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="col col-full pl-16 pr-16">
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
          <div>
            {selection && open.isShow && (
              <Popup
                open={open.isShow}
                closeOnDocumentClick
                onClose={() => onClose()}
              >
                <div className="col modal style-lg-box bg-color-white text-align-ct">
                  <h2>Nhập thông tin thu</h2>
                  <div className="col col-full mt-8">
                    <div className="col col-full mt-8 pr-4">
                      <FormError
                        isHidden={newBudget.name.isHidden}
                        errorMessage={newBudget.name.errorMessage}
                      />
                      <InputField
                        name="name"
                        isValid={newBudget.name.isValid}
                        value={newBudget.name.value}
                        type={newBudget.name.type}
                        placeholder={newBudget.name.title}
                        onChange={handleInput}
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div className="col col-full mt-8">
                    <div className="col pd-4">Loại thu</div>
                    <select
                      className="form-control"
                      name="type_revenue"
                      onChange={handleInput}
                      value={newBudget.type_revenue.value}
                    >
                      {selection.revenueType.map((value, index) => {
                        return (
                          <option key={index} value={value.id}>
                            {value.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col col-full mt-8">
                    <InputField
                      name="description"
                      isValid={true}
                      value={newBudget.description.value}
                      type={newBudget.description.type}
                      placeholder={newBudget.description.title}
                      onChange={handleInput}
                      autocomplete="off"
                    />
                  </div>
                  <div className="col col-full mt-8">
                    <FormError
                      isHidden={newBudget.amount.isHidden}
                      errorMessage={newBudget.amount.errorMessage}
                    />
                    <InputField
                      name="amount"
                      isValid={newBudget.amount.isValid}
                      value={newBudget.amount.value}
                      type={newBudget.amount.type}
                      placeholder={newBudget.amount.title}
                      onChange={handleInput}
                      autocomplete="off"
                    />
                  </div>
                  <div className="col col-full mt-8">
                    <div className="col pd-4">Người thu</div>
                    <select
                      className="form-control"
                      name="user_recieve"
                      onChange={handleInput}
                      value={newBudget.user_recieve.value}
                    >
                      {selection.recievedUser.map((value, index) => {
                        return (
                          <option key={index} value={value.id}>
                            {value.first_name + " " + value.last_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col col-full mt-8">
                    <div className="col pd-4">Ngày thu</div>
                    <InputField
                      name="date_recieve"
                      isValid={true}
                      value={newBudget.date_recieve.value}
                      type={newBudget.date_recieve.type}
                      placeholder={newBudget.date_recieve.title}
                      onChange={handleInput}
                      autocomplete="off"
                    />
                  </div>
                  <div className="col col-full mt-8">
                    <InputField
                      name="time_recieve"
                      isValid={true}
                      value={newBudget.time_recieve.value}
                      type={newBudget.time_recieve.type}
                      placeholder={newBudget.time_recieve.title}
                      onChange={handleInput}
                      autocomplete="off"
                    />
                  </div>
                  <div className="col col-full mt-24">
                    <div className="col col-half">
                      <Button
                        type="normal-red"
                        content="HỦY"
                        isDisable={false}
                        onClick={onClose}
                      />
                    </div>
                    <div className="col col-half">
                      <Button
                        type="normal-ubg"
                        content="LƯU"
                        isDisable={false}
                        onClick={saveBudget}
                      />
                    </div>
                  </div>
                </div>
              </Popup>
            )}
            <div>
              <Alertness
                open={openAlert}
                onClose={onCloseAlert}
                type={notification.type}
                content={notification.content}
              />
            </div>
            <div>
              <Alertness
                open={openConfirm.isShow}
                onClose={onCloseConfirm}
                type={notification.type}
                content={notification.content}
                onClick={handleDelete}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
