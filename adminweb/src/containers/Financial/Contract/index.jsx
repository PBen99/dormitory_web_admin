import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "./styles.css";
import * as ROUTER from "../../../utilities/constants/router";
import Box from "@material-ui/core/Box";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import ReactModal from "react-modal";
import { useHistory } from "react-router-dom";
import {
  getContracts,
  getListWaterElectricalBills,
  updateWaterElectricalBill,
} from "../../../redux/actions/financial";
import Select from "react-select";
import { Button as MUIButton } from "@material-ui/core/";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRoomDetails } from "../../../redux/actions/humanResource";
import { isAllowed } from "../../../utilities/helper";
import Permissionless from "../../../components/common/Permissionless";
import Loader from "../../../components/common/Loader";

export default function Budget() {
  let history = useHistory();

  const loader = useSelector((state) => state.financial.loading);

  const [startDate, setStartDate] = useState(new Date());

  const [endDate] = useState(new Date());

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSelectStudentModalVisible, setIsSelectStudentModalVisible] =
    useState(false);
  const [selectedOption, setSelectedOption] = useState("contract");

  const [dataContracts, setDataContracts] = useState([]);

  const [dataBill, setDataBill] = useState([]);
  const [selectedPeoplePaid, setSelectedPeoplePaid] = useState();
  const [selectedBillId, setSelectedBillId] = useState();

  useEffect(() => {
    getContracts((output) => {
      if (output) {
        setDataContracts(output.results);
      }
    });

    getListWaterElectricalBills(
      "",
      `month=${moment(startDate).format("MM")}&year=${moment(startDate).format(
        "YYYY"
      )}`,
      (output) => {
        if (output) {
          setDataBill(output.results);
        }
      }
    );
  }, [startDate, isSelectStudentModalVisible]);
  const [peopleInRoom, setPeopleInRoom] = useState();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.defaultValue);
  };
  const convertDataForTable = (data) => {
    return data.list_user.map((n) => ({
      value: n.user_id,
      label: n.first_name + n.last_name,
    }));
  };
  const handleSelectPeople = (data) => {
    const slug = formatDataBill(dataBill).find(
      (index) => index.room_name === data
    ).slug;
    setSelectedBillId(
      formatDataBill(dataBill).find((index) => index.room_name === data)
        .public_id
    );
    getRoomDetails(slug, (output) => {
      if (output) {
        setPeopleInRoom(convertDataForTable(output));
      }
    });
    setIsSelectStudentModalVisible(true);
  };
  const handlePayFee = () => {
    const dataSend = {
      is_paid: true,
      time_paid: moment().format("YYYY-MM-DD hh:mm:ss"),
      sinhvien_paid: selectedPeoplePaid,
    };
    updateWaterElectricalBill(selectedBillId, dataSend, (output) => {
      console.log(output);
    });
    toast("????ng ti???n th??nh c??ng!");
    setTimeout(hideModal, 4000);
    setIsSelectStudentModalVisible(false);
  };
  const contractColumn = [
    {
      label: "Th??? t???",
      name: "order",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "roomName",
      label: "T??n Ph??ng",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "studentName",
      label: "T??n Sinh Vi??n",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "studentPhone",
      label: "S??T li??n l???c",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "studentClass",
      label: "L???p",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "startDate",
      label: "Ng??y b???t ?????u",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) =>
          moment(new Date(value)).format("DD/MM/YYYY"),
      },
    },
    {
      name: "endDate",
      label: "Ng??y k???t th??c",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) =>
          moment(new Date(value)).format("DD/MM/YYYY"),
      },
    },
    {
      name: "is_expired",
      label: "H???t h???n",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return value ? (
            <div style={{ color: "red" }}>???? h???t h???n</div>
          ) : (
            <div style={{ color: "green" }}>Ch??a h???t h???n</div>
          );
        },
      },
    },
  ];
  const billColumn = [
    {
      label: "T??n ph??ng",
      name: "room_name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Th???i gian",
      name: "date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Gi?? ??i???n",
      name: "water_price",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) =>
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(value),
      },
    },
    {
      label: "Gi?? n?????c",
      name: "electrical_price",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) =>
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(value),
      },
    },
    {
      label: "T???ng ti???n",
      name: "total",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) =>
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(value),
      },
    },
    {
      label: "T??nh tr???ng",
      name: "is_paid",
      options: {
        customBodyRender: (value) => {
          return (
            <div style={{ color: `${value === false ? "red" : "green"}` }}>
              {value === false ? "Ch??a ????ng ti???n" : "???? ????ng ti???n"}
            </div>
          );
        },
      },
    },
    {
      label: "????ng ti???n",
      name: "button",
      options: {
        customBodyRender: (button, tableMetaData) => {
          return (
            <MUIButton
              variant="contained"
              color="primary"
              disabled={tableMetaData.rowData[5]}
              onClick={() => handleSelectPeople(tableMetaData.rowData[0])}
            >
              ????ng
            </MUIButton>
          );
        },
      },
    },
  ];
  const formatData = (data) => {
    return data?.map((value, index) => {
      return {
        contractId: value.public_id,
        order: index + 1,
        roomName: value.room.name,
        studentName: `${value.profile.user.last_name} ${value.profile.user.first_name}`,
        studentPhone: value.profile.phone,
        studentClass: `${value.profile.my_class.name} ${value.profile.faculty.name}`,
        is_expired: value.is_expired,
        startDate: value.start_at,
        endDate: value.end_at,
      };
    });
  };

  const formatDataBill = (data) => {
    return data.map((index) => {
      return {
        id: index.id,
        water_electrical_id: index.water_electrical.id,
        room_name: index.water_electrical.room.name,
        date: `${index.water_electrical.month}/${index.water_electrical.year}`,
        water_price: index.water_electrical.water_price,
        electrical_price: index.water_electrical.electrical_price,
        is_paid: index.is_paid,
        public_id: index.public_id,
        slug: index.water_electrical.room.slug,
        total:
          index.water_electrical.water_price +
          index.water_electrical.electrical_price,
      };
    });
  };

  const getHyphenatedDate = (dateString) =>
    moment(dateString, "YYYY/MM/DD").format("YYYY/MM/DD");
  const gridContractData = formatData(dataContracts)?.map((row) => {
    const updatedRow = {
      ...row,
      startDate: getHyphenatedDate(row.startDate),
      startDateNumber: moment(row.startDate, "YYYY/MM/DD").toDate().getTime(),

      endDate: getHyphenatedDate(row.endDate),
      endDateNumber: moment(row.endDate, "YYYY/MM/DD").toDate().getTime(),
    };
    return updatedRow;
  });
  const gridBillData = dataBill
    ? formatDataBill(dataBill).map((row) => {
        const updatedRow = {
          ...row,
          id: parseInt(row.id),
          description: `${row.description}`,
          number: row.number,
          createdDate: getHyphenatedDate(row.createdDate),
          createdDateNumber: moment(row.createdDate, "MM/DD/YYYY")
            .toDate()
            .getTime(),
        };
        return updatedRow;
      })
    : null;

  const handleRowClick = (params, rowMeta) => {
    history.push(
      `${ROUTER.ROUTE_MANAGE_FINANCIAL}${ROUTER.ROUTE_CONTRACT_DETAIL}/${
        dataContracts[rowMeta.rowIndex].public_id
      }`
    );
  };
  const options = {
    filterType: "textField",
    selectableRows: "none",
    onRowClick: selectedOption === "contract" ? handleRowClick : () => {},
  };
  const hideModal = () => {
    setIsModalVisible(false);
    setIsSelectStudentModalVisible(false);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "50%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
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
    <div>
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
          {dataContracts && dataBill && (
            <div className="col col-full pl-48 ">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ display: "flex", paddingLeft: "5%" }}>
                  <div className="col-full pt-16">
                    <label className="mr-8" htmlFor="contract">
                      H???p ?????ng
                    </label>
                    <input
                      type="radio"
                      id="contract"
                      value="contract"
                      onChange={handleOptionChange}
                      checked={selectedOption === "contract"}
                    />
                    <label className="ml-16 mr-8" htmlFor="bill">
                      H??a ????n
                    </label>
                    <input
                      type="radio"
                      id="bill"
                      value="bill"
                      onChange={handleOptionChange}
                      checked={selectedOption === "bill"}
                    />
                  </div>
                </span>
                <div className="budget-date-picker">
                  <span style={{ fontSize: "16px" }}>Th??ng: </span>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="MM/yyyy"
                    className={"budget-date-picker-calendar"}
                    showMonthYearPicker
                  />
                </div>
              </div>
              <div
                className={"budget-table"}
                style={{ marginTop: "20px", position: "sticky" }}
              >
                <Box component="div" marginLeft={8}>
                  <MuiThemeProvider theme={getMuiTheme()}>
                    {selectedOption === "contract" ? (
                      <MUIDataTable
                        title={"H???p ?????ng"}
                        data={gridContractData}
                        columns={contractColumn}
                        options={options}
                      />
                    ) : (
                      <MUIDataTable
                        title={"Ho?? ????n"}
                        data={gridBillData}
                        columns={billColumn}
                        options={options}
                      />
                    )}
                  </MuiThemeProvider>
                </Box>
                <ReactModal
                  isOpen={isModalVisible}
                  onRequestClose={hideModal}
                  style={customStyles}
                ></ReactModal>
              </div>
            </div>
          )}
          <ReactModal
            isOpen={isSelectStudentModalVisible}
            onRequestClose={hideModal}
            style={customStyles}
          >
            <div>
              <div className={"mb-20"}>L???a ch???n ng?????i ????ng ti???n</div>
              <Select
                className="people-select mb-20"
                options={peopleInRoom}
                onChange={(value) => setSelectedPeoplePaid(value.value)}
              />
              <MUIButton
                variant="contained"
                color="primary"
                onClick={handlePayFee}
              >
                X??c nh???n
              </MUIButton>
              <ToastContainer />
            </div>
          </ReactModal>
        </div>
      )}
    </div>
  );
}
