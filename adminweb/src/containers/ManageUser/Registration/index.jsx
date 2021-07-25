import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/common/Loader";
import Button from "@material-ui/core/Button";
import StyledButton from "../../../components/common/Button";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  AcceptRegistrationRoom,
  DenyRegistrationRoom,
  GetListRegistrationRoom,
} from "../../../redux/actions/humanResource";
import moment from "moment";
import * as APIAlertMessage from "../../../utilities/constants/APIAlertMessage";
import * as AlertMessage from "../../../utilities/constants/AlertMessage";
import Alertness from "../../../components/common/Alertness";
import Popup from "reactjs-popup";

const Registration = () => {
  const [registrationData, setRegistration] = useState([]);

  const [openAlert, setOpenAlert] = useState(false);

  const [action, setAction] = useState();

  const [notification, setNotification] = useState({
    type: "",
    content: "",
  });

  const loader = useSelector((state) => state.humanResource.loading);

  const onCloseAlert = () => setOpenAlert(false);

  const onOpenAlert = () => setOpenAlert(true);

  const [openSubmission, setOpenSubmission] = useState(false);

  const onCloseSubmission = () => setOpenSubmission(false);

  const onOpenSubmission = () => setOpenSubmission(true);
  useEffect(() => {
    GetListRegistrationRoom((output) => {
      if (output) {
        let data = output.results.map((value, index) => {
          return {
            order: index + 1,
            publicId: value.public_id,
            request: value.profile.user.email,
            roomRequested: value.room.name,
            area: value.room.area.name,
            address: value.profile.address,
            createdDate: moment(value.created_at).format("DD-MM-YYYY"),
          };
        });
        setRegistration(data);
      }
    });
  }, [openAlert]);

  const columnsNoti = [
    {
      name: "order",
      label: "Thứ tự",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "request",
      label: "Email người gửi",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "roomRequested",
      label: "Phòng",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "area",
      label: "Khu",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "address",
      label: "Địa chỉ",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "createdDate",
      label: "Ngày gửi yêu cầu",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "",
      label: "",
      options: {
        customBodyRender: () => {
          return (
            <Button variant="contained" color="primary">
              Chi tiết
            </Button>
          );
        },
      },
    },
    {
      name: "ACTION",
      label: "Accept",
      options: {
        customBodyRender: (value, tableMetaData) => {
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                handleAction(
                  "add",
                  registrationData[tableMetaData.rowIndex].publicId
                )
              }
            >
              Xác nhận
            </Button>
          );
        },
      },
    },
    {
      name: "ACTION",
      label: "",
      options: {
        customBodyRender: (value, tableMetaData) => {
          return (
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                handleAction(
                  "delete",
                  registrationData[tableMetaData.rowIndex].publicId
                )
              }
            >
              Hủy bỏ
            </Button>
          );
        },
      },
    },
  ];

  function handleAction(name, data) {
    onOpenSubmission();
    setAction({ name: name, data: data });
  }

  function handleConfirmation() {
    switch (action.name) {
      case "delete":
        DenyPeople(action.data);
        break;
      case "add":
        AddPeople(action.data);
        break;
      default:
        break;
    }
    onCloseSubmission();
  }

  function AddPeople(slug) {
    AcceptRegistrationRoom(slug, (output) => {
      if (output.detail) {
        switch (output.detail) {
          case APIAlertMessage.ACCEPT_SUCCESSFULLY:
            setNotification({
              type: "type-success",
              content: AlertMessage.ACCEPT_SUCCESSFULLY,
            });
            break;
          default:
            setNotification({
              type: "type-error",
              content: AlertMessage.SYSTEM_ERROR,
            });
            break;
        }
      } else {
        setNotification({
          type: "type-error",
          content: AlertMessage.SYSTEM_ERROR,
        });
      }
    });
    onOpenAlert();
  }

  const DenyPeople = (slug) => {
    DenyRegistrationRoom(slug, (output) => {
      if (output.detail) {
        switch (output.detail) {
          case APIAlertMessage.DENY_SUCCESSFULLY:
            setNotification({
              type: "type-success",
              content: AlertMessage.DENY_SUCCESSFULLY,
            });
            break;
          default:
            setNotification({
              type: "type-error",
              content: AlertMessage.SYSTEM_ERROR,
            });
            break;
        }
      } else {
        setNotification({
          type: "type-error",
          content: AlertMessage.SYSTEM_ERROR,
        });
      }
    });
    onOpenAlert();
  };

  const options = {
    filterType: "textField",

    pagination: false,
    selectableRows: "none",
    customHeadRender: () => {
      return null;
    },
  };

  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          root: {
            backgroundColor: "#re",
          },
          paper: {
            width: "1200px",
          },
        },
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: "#FFF",
          },
        },
      },
    });

  return (
    <div className="col col-full">
      {loader ? (
        <div className="align-item-ct">
          <Loader />
        </div>
      ) : (
        <div>
          {registrationData && (
            <div className="col col-full pt-16" style={{ zIndex: "1" }}>
              <MuiThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                  className="mg-auto"
                  title={"Yêu cầu vào phòng"}
                  data={registrationData}
                  columns={columnsNoti}
                  options={options}
                />
              </MuiThemeProvider>
            </div>
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
            <Popup
              open={openSubmission}
              closeOnDocumentClick
              onClose={() => onCloseSubmission()}
            >
              <div className="col modal style-lg-box bg-color-white text-align-ct">
                <div className="col col-full pd-8">
                  <div className="style-alertness-icon icon-warning text-20 pd-8 text-is-orange inline-block mr-16">
                    <i class="fi-rr-info"></i>
                  </div>
                  <div className="inline-block text-20 bold-text">Xác nhận</div>
                </div>
                <div className="col col-full mb-16 text-is-grey">
                  <span>Mời xác nhận</span>
                </div>
                <div className="col col-half">
                  <StyledButton
                    type="normal-blue"
                    content="Đồng ý"
                    onClick={handleConfirmation}
                    isDisable={false}
                  />
                </div>
                <div className="col col-half">
                  <StyledButton
                    type="normal-red"
                    content="Đóng"
                    onClick={onCloseSubmission}
                    isDisable={false}
                  />
                </div>
              </div>
            </Popup>
          </div>
        </div>
      )}
    </div>
  );
};
export default Registration;
