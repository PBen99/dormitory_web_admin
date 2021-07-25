import React, { useState, useEffect } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  getExpenseType,
  getUserBudget,
  updateExpense,
} from "../../../../redux/actions/financial";
import Button from "../../../../components/common/Button";
import FormError from "../../../../components/common/FormError";
import InputField from "../../../../components/common/InputField";
import Pagination from "../../../../components/common/Pagination";
import Popup from "reactjs-popup";
import queryString from "querystring";
import {
  getExpenseRender,
  sendExpense,
} from "../../../../utilities/constants/DataRender/budget";
import validate from "../../../../utilities/regex";
import Alertness from "../../../../components/common/Alertness";
import * as ALERTMESSAGE from "../../../../utilities/constants/AlertMessage";
import * as AlertApi from "../../../../utilities/constants/APIAlertMessage";
import Loader from "../../../../components/common/Loader";
import { isAllowed } from "../../../../utilities/helper";
import Permissionless from "../../../../components/common/Permissionless";

export default function OutBudget() {
  const loader = useSelector((state) => state.financial.loading);

  const [dataOutBudget, setDataOutbudget] = useState([]);

  const [selection, setSelection] = useState(null);

  const [newBudget, setBudget] = useState(null);

  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 20,
    totals: 1,
  });

  const [filter, setFilter] = useState({
    page: 1,
  });

  const [notification, setNotification] = useState({
    type: "",
    content: "",
  });

  const [openAlert, setOpenAlert] = useState(false);

  const [isUpdate, setUpdate] = useState(false);

  const onCloseAlert = () => setOpenAlert(false);

  const onOpenAlert = () => setOpenAlert(true);

  const [open, setOpen] = useState({
    isShow: false,
    action: "",
  });

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
    setBudget(getExpenseRender(null));
    onOpen("add");
  }

  useEffect(() => {
    let mounted = true;

    const paramsString = queryString.stringify(filter);

    getExpenses(paramsString, (output) => {
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
              value: value.type_expense.name,
              id: value.type_expense.id,
            },
            description: value.description,
            createdBy:
              value.created_by.first_name + " " + value.created_by.last_name,
            price: value.price,
            createdDate: new Date(value.created_at),
            paidDate: new Date(value.time_paid),
            userPaid: {
              value:
                value.user_paid.user.first_name +
                " " +
                value.user_paid.user.last_name,
              id: value.user_paid.user.id,
            },
          };
        });
        if (mounted) {
          setPagination(pagination);
          setDataOutbudget(data);
        }
      }
    });
    return () => (mounted = false);
  }, [isUpdate, filter]);

  useEffect(() => {
    let mounted = true;

    let selection = {
      expenseType: [],
      paidUser: [],
    };

    getExpenseType((output) => {
      if (output) {
        if (mounted) {
          selection.expenseType = output;
        }
      }
    });

    getUserBudget((output) => {
      if (output) {
        if (mounted) {
          selection.paidUser = output;
        }
      }
    });

    setSelection(selection);
    return () => (mounted = false);
  }, []);

  function handlePageChange(newPage) {
    setFilter({ ...filter, page: newPage });
  }

  function handleConfirm(event, value) {
    event.stopPropagation();
    setNotification({
      type: "type-warning",
      content: ALERTMESSAGE.REMOVAL_CONFIRM,
    });
    onOpenConfirm(value);
  }

  function validateBudget() {
    let tempEditData = { ...newBudget };

    Object.keys(newBudget).forEach((value) => {
      if (
        newBudget[value].validateType &&
        !validate[newBudget[value].validateType](newBudget[value].value)
      ) {
        tempEditData[value].isValid = false;
        tempEditData[value].isHidden = false;
      } else {
        tempEditData[value].isValid = true;
        tempEditData[value].isHidden = true;
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
    if (newBudget.name.isValid && newBudget.price.isValid) {
      const data = sendExpense(newBudget);

      if (open.action === "add") {
        createExpense(data, (output) => {
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
        updateExpense(data, newBudget.publicId.value, (output) => {
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
    setBudget(getExpenseRender(value));
    onOpen("edit");
  }

  function handleDelete() {
    deleteExpense(openConfirm.value, (output) => {
      if (output) {
        alert(output.notification);
        setUpdate((prev) => !prev);
      }
    });
    onCloseConfirm();
  }

  return (
    <div>
      {!isAllowed("quanlytaichinh_group", "view_expense") ? (
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
                isDisable={!isAllowed("quanlytaichinh_group", "add_expense")}
              />
            </div>
            {dataOutBudget && (
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
                        Ngày trả
                      </th>
                      <th className="col col-10 bold-text pl-4 pr-4 pt-16 pb-16">
                        Người trả
                      </th>
                      <th className="col col-10 bold-text pl-4 pr-4 pt-16 pb-16">
                        Xóa
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataOutBudget.map((value, index) => {
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
                            {moment(value.paidDate).format(
                              "DD-MM-YYYY hh:mm:ss a"
                            )}
                          </td>
                          <td className="col col-10 text-align-ct bold-text text-14 pl-4 pr-4 pt-16 pb-16">
                            {value.userPaid.value}
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
              <Popup open={open} closeOnDocumentClick onClose={() => onClose()}>
                <div className="col modal style-lg-box bg-color-white text-align-ct">
                  <h2>Nhập thông tin chi</h2>
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
                    <div className="col pd-4">Loại chi</div>
                    <select
                      className="form-control"
                      name="type_expense"
                      onChange={handleInput}
                      value={newBudget.type_expense.value}
                    >
                      {selection.expenseType.map((value, index) => {
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
                      isHidden={newBudget.price.isHidden}
                      errorMessage={newBudget.price.errorMessage}
                    />
                    <InputField
                      name="price"
                      isValid={newBudget.price.isValid}
                      value={newBudget.price.value}
                      type={newBudget.price.type}
                      placeholder={newBudget.price.title}
                      onChange={handleInput}
                      autocomplete="off"
                    />
                  </div>
                  <div className="col col-full mt-8">
                    <div className="col pd-4">Người trả</div>
                    <select
                      className="form-control"
                      name="user_paid"
                      onChange={handleInput}
                      value={newBudget.user_paid.value}
                    >
                      {selection.paidUser.map((value, index) => {
                        return (
                          <option key={index} value={value.id}>
                            {value.first_name + " " + value.last_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col col-full mt-8">
                    <InputField
                      name="date_paid"
                      isValid={true}
                      value={newBudget.date_paid.value}
                      type={newBudget.date_paid.type}
                      placeholder={newBudget.date_paid.title}
                      onChange={handleInput}
                      autocomplete="off"
                    />
                  </div>
                  <div className="col col-full mt-8">
                    <InputField
                      name="time_paid"
                      isValid={true}
                      value={newBudget.time_paid.value}
                      type={newBudget.time_paid.type}
                      placeholder={newBudget.time_paid.title}
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
