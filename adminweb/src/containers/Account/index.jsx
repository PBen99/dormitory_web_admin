/* eslint-disable react-hooks/exhaustive-deps */
import MUIDataTable from "mui-datatables";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Button from "../../components/common/Button";
import React, { useState, useEffect } from "react";
import AddAccount from "./AddAccount";
import MoreButton from "./MoreButton";
import Alertness from "../../components/common/Alertness";
import * as APIALERTMESSAGE from "../../utilities/constants/APIAlertMessage";
import * as ALERTMESSAGE from "../../utilities/constants/AlertMessage";
import Loader from "../../components/common/Loader";
import Permissionless from "../../components/common/Permissionless";

import {
  getAccounts,
  getGroupAndPermission,
  getFaculty,
  getClass,
  getPosition,
  getArea,
  createAccount,
  updateAccount,
} from "../../redux/actions/account";
import moment from "moment";
import YesNoModal from "../../components/YesNoModal";
import "./styles.css";
import { getEmptyAccount } from "../../utilities/constants/DataRender/account";
import queryString from "querystring";
import { isAllowed } from "../../utilities/helper";
export default function Account() {
  const [data, setData] = useState({
    list: null,
    totals: null,
  });

  const loader = useSelector((state) => state.account.loading);

  const [isUpdate, setUpdate] = useState();

  const [selection, setSelection] = useState({
    faculty: null,
    permission: null,
    class_in_university: null,
    position: null,
    area: null,
  });

  const [filter, setFilter] = useState({
    page: 1,
  });

  function updateState() {
    setUpdate((prev) => !prev);
  }

  function addAccount(sendData) {
    createAccount(sendData, (output) => {
      if (output) {
        switch (output.status) {
          case APIALERTMESSAGE.STATUS_SUCCESS:
            setNotification({
              type: "type-success",
              content: ALERTMESSAGE.CREATE_SUCCESSFULLY,
            });

            updateState();
            break;
          default:
            setNotification({
              type: "type-error",
              content: output.notification,
            });
            break;
        }
      } else {
        setNotification({
          type: "type-error",
          content: ALERTMESSAGE.SYSTEM_ERROR,
        });
      }
      hideModal();
      onOpen();
    });
  }
  const [notification, setNotification] = useState({
    type: "",
    content: "",
  });

  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  const onOpen = () => setOpen(true);

  const [isYesNoModalVisible, setIsYesNoModalVisible] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          root: {
            backgroundColor: "#re",
          },
          paper: {
            width: "fit-content",
          },
        },
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: "#FFF",
          },
        },
      },
    });

  const columns = [
    {
      name: "name",
      label: "Tên",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "account",
      label: "Tài khoản",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "role",
      label: "Chức vụ",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "area",
      label: "Khu vực",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "my_class",
      label: "Lớp học phần",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "faculty",
      label: "Khoa",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "phone",
      label: "SĐT liên lạc",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "activeDate",
      label: "Ngày kích hoạt",
      options: {
        filter: false,
        sort: true,
        display: false,
      },
    },
    {
      name: "is_active",
      label: "Trạng thái",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div className={`${value === true ? "green" : "red"}`}>
              {value === true ? "Mở" : "Khoá"}
            </div>
          );
        },
      },
    },
    {
      label: "Khác",
      name: "userId",
      options: {
        sort: false,
        filter: false,
        customBodyRender: (userId, tableMetaData) => (
          <MoreButton
            rowUser={data.list[tableMetaData.rowIndex]}
            updateState={updateState}
            permission={selection.permission}
            faculty={selection.faculty}
            class_in_university={selection.class_in_university}
            position={selection.position}
            area={selection.area}
            updateAccount={handleUpdateAccount}
          />
        ),
      },
    },
  ];

  function convertDataForTable(data) {
    let result = data.map((value, index) => {
      return {
        order: index + 1,
        name: value.user.last_name + " " + value.user.first_name,
        account: value.user.username,
        role: value.position ? value.position.name : "--",
        faculty: value.faculty ? value.faculty.name : "--",
        my_class: value.my_class ? value.my_class.name : "--",
        area: value.area ? value.area.name : "--",
        phone: value.phone,
        birthday: value.birthday,
        address: value.address,
        identify_card: value.identify_card,
        is_active: value.user.is_active,
        activeDate: moment(new Date(value.created_at)).format("DD-MM-YYYY"),
      };
    });
    return result;
  }

  useEffect(() => {
    const paramsString = queryString.stringify(filter);

    getAccounts(paramsString, (output) => {
      if (output) {
        setData({ list: output.results, totals: output.totals });
      }
    });
  }, [isUpdate, filter]);

  useEffect(() => {
    const option = { ...selection };

    getGroupAndPermission((output) => {
      if (output) {
        option.permission = output;
      }
    });

    getFaculty((output) => {
      if (output) {
        option.faculty = output;
      }
    });

    getClass((output) => {
      if (output) {
        option.class_in_university = output;
      }
    });

    getPosition((output) => {
      if (output) {
        option.position = output;
      }
    });

    getArea((output) => {
      if (output) {
        option.area = output;
      }
    });

    setSelection(option);
  }, []);

  const options = {
    filter: false,
    selectableRows: "none",
    onRowClick: null,
    serverSide: true,
    jumpToPage: true,
    count: data.totals,
    searchPlaceholder: "Tìm kiếm theo tên hoặc tài khoản",
    //count, // Use total number of items
    onTableChange: (action, tableState) => {
      handleTableChange(action, tableState);
      //handleKeypress();git
    },
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleTableChange = (action, tableState) => {
    switch (action) {
      case "changeRowsPerPage":
      case "changePage":
      case "sort":
      case "search":
      case "filterChange":
      case "resetFilters":
        handleTriggerAction(tableState);
        break;
      default:
        break;
    }
  };

  const handleTriggerAction = (tableState) => {
    let keyword = "";
    if (tableState.sesearchText !== "") {
      keyword = tableState.sesearchText;
    }
    setFilter({ ...filter, page: tableState.page + 1, keyword: keyword });
  };

  const handleAddAccount = () => {
    setIsModalVisible(true);
  };

  function handleUpdateAccount(updatedData, public_id) {
    updateAccount(public_id, updatedData, (output) => {
      if (output) {
        switch (output.status) {
          case APIALERTMESSAGE.STATUS_SUCCESS:
            setNotification({
              type: "type-success",
              content: ALERTMESSAGE.UPDATE_PROFILE_SUCCESSFULLY,
            });

            updateState();
            break;
          default:
            setNotification({
              type: "type-error",
              content: output.notification,
            });
            break;
        }
      } else {
        setNotification({
          type: "type-error",
          content: ALERTMESSAGE.SYSTEM_ERROR,
        });
      }
      hideModal();
      onOpen();
    });
  }
  return (
    <div className="pl-24 pr-24">
      {!isAllowed("admin_group", "view_user") ? (
        <div className="align-item-ct">
          <Permissionless />
        </div>
      ) : loader ? (
        <div className="align-item-ct">
          <Loader />
        </div>
      ) : (
        <div>
          {data.list && (
            <div className="account_page">
              <Box marginBottom={5} className="account-header">
                <YesNoModal
                  isModalVisible={isYesNoModalVisible}
                  hideModal={() => {}}
                  title={"Xác nhận"}
                  message={"Mời xác nhận"}
                  okText={"OK"}
                  cancelText={"Cancel"}
                  onCancel={() => {
                    setIsYesNoModalVisible(false);
                  }}
                />
                <div className="col col-full">
                  <Button
                    type="normal-blue"
                    content="Tạo"
                    onClick={handleAddAccount}
                    isDisable={!isAllowed("admin_group", "add_user")}
                  />
                </div>
              </Box>

              <Box marginLeft={0}>
                <MuiThemeProvider theme={getMuiTheme()}>
                  <MUIDataTable
                    title={"Danh sách tài khoản trong hệ thống"}
                    data={convertDataForTable(data.list)}
                    columns={columns}
                    options={options}
                  />
                </MuiThemeProvider>
              </Box>
              <AddAccount
                userInfor={getEmptyAccount()}
                hideModal={hideModal}
                isOpen={isModalVisible}
                permission={selection.permission}
                faculty={selection.faculty}
                class_in_university={selection.class_in_university}
                position={selection.position}
                area={selection.area}
                createAccount={addAccount}
              />
              <div>
                <Alertness
                  open={open}
                  onClose={onClose}
                  type={notification.type}
                  content={notification.content}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
