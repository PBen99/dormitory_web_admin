import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Typography from "@material-ui/core/Typography";
import ReactModal from "react-modal";
import ShowBill from "./ShowBill";
import queryString from "querystring";
import "./styles.css";
import {
  getListWaterElectricalIndexes,
  getUnitPrice,
} from "../../../redux/actions/financial";
import { month as MONTH } from "../../../utilities/constants/titles";
import { getArea, getRoombyArea } from "../../../redux/actions/account";
import Button from "../../../components/common/Button";
import Loader from "../../../components/common/Loader";
import Permissionless from "../../../components/common/Permissionless";
import AddIndex from "./AddIndex";
import { isAllowed } from "../../../utilities/helper";

export default function WaterElectrical() {
  const current = new Date();

  const loader = useSelector((state) => state.financial.loading);

  const month = MONTH;

  const [tableData, setTableData] = useState([]);

  const [area, setArea] = useState();

  const [isUpdate, setUpdate] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [addSelectionList, setAddSelectionList] = useState({
    rooms: [],
    prices: [],
  });

  const [roomSelected, setRoomSelected] = useState();

  const [openAddForm, setOpenAddForm] = useState(false);

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleCellClicked = (params) => {
    setRoomSelected(params.data);
    setIsModalVisible(true);
  };

  const onCancel = () => {
    setIsModalVisible(false);
  };

  const [selection, setSelection] = useState({
    area: "area-a",
    year: current.getFullYear(),
    month: current.getMonth() + 1,
  });

  const year = [];

  for (var i = current.getFullYear(); i > current.getFullYear() - 5; i--) {
    year.push({ value: i, label: i.toString() });
  }

  useEffect(() => {
    let mounted = true;
    const params = queryString.stringify(selection);
    getListWaterElectricalIndexes(params, (output) => {
      if (output) {
        console.log(output);
        if (mounted) {
          const data = output.map((value) => {
            return {
              public_id: value.public_id,
              name: value.created_by.first_name + value.created_by.last_name,
              roomId: value.room.id,
              created_at: value.created_at,
              room: value.room.name,
              old_index_water: value.old_index_water,
              new_index_water: value.new_index_water,
              old_index_electrical: value.old_index_electrical,
              new_index_electrical: value.new_index_eclectrical,
              water_electrical_unit_price:
                value.water_electrical_unit_price.name,
              water_electrical_unit_price_id:
                value.water_electrical_unit_price.id,
              water_price: value.water_price,
              electrical_price: value.electrical_price,
              isPaid: value.isPaid,
            };
          });
          setTableData(data);
        }
      }
    });
    let data = {
      prices: [],
      rooms: [],
    };
    getRoombyArea(selection.area, (output) => {
      if (output) {
        data.rooms = output;
      }
    });

    getUnitPrice((output) => {
      if (output) {
        if (mounted) {
          data.prices = output.results;
        }
      }
    });

    setAddSelectionList(data);
    return () => (mounted = false);
  }, [selection, isUpdate]);

  useEffect(() => {
    let mounted = true;

    getArea((output) => {
      if (output) {
        if (mounted) {
          setArea(output);
        }
      }
    });

    return () => (mounted = false);
  }, []);

  const onGridReady = (params) => {
    let _gridApi = params.api;
    _gridApi.forEachNode(function (rowNode, index) {
      rowNode.id = index;
    });
  };

  const handleTimeChange = (e) => {
    const { value, name } = e.target;
    setSelection({ ...selection, [name]: value });
  };

  const columnDefs = [
    {
      headerName: "Phòng",
      field: "room",
      filter: "agNumberColumnFilter",
      cellStyle: {
        with: "20px",
        fontSize: "14px",
        textAlign: "center",
      },
    },
    {
      headerName: "Số nước cũ",
      field: "old_index_water",
      filter: "agTextColumnFilter",
      cellStyle: {
        fontSize: "14px",
        textAlign: "center",
      },
    },
    {
      headerName: "Số nước mới",
      field: "new_index_water",
      filter: "agTextColumnFilter",
      cellStyle: {
        fontSize: "14px",
        textAlign: "center",
      },
    },
    {
      headerName: "Số điện cũ",
      field: "old_index_electrical",
      filter: "agTextColumnFilter",
      cellStyle: {
        fontSize: "14px",
        textAlign: "center",
      },
    },
    {
      headerName: "Số điện mới",
      field: "new_index_electrical",
      filter: "agTextColumnFilter",
      cellStyle: {
        fontSize: "14px",
        textAlign: "center",
      },
    },
    {
      headerName: "Loại đơn giá",
      field: "water_electrical_unit_price",
      filter: "agTextColumnFilter",
      cellStyle: {
        fontSize: "14px",
        textAlign: "center",
      },
    },
    {
      headerName: "Giá nước(VND)",
      field: "water_price",
      filter: "agTextColumnFilter",
      cellStyle: {
        fontSize: "14px",
        textAlign: "center",
      },
    },
    {
      headerName: "Giá điện(VND)",
      field: "electrical_price",
      filter: "agTextColumnFilter",
      cellStyle: {
        fontSize: "14px",
        textAlign: "center",
      },
    },
    {
      headerName: "Trạng thái",
      field: "isPaid",
      filter: "agTextColumnFilter",
      cellStyle: {
        fontSize: "14px",
        textAlign: "center",
      },
      cellRenderer: (param) => {
        const bgColor = param.value === true ? "green;" : "#EB5757";
        return `<div style="color: ${bgColor};font-size:14px;text-align: center;">${
          param.value === true ? "Đã đóng tiền" : "Chưa đóng tiền"
        }</div>`;
      },
    },
  ];

  const rowClassRules = {
    odd: function (params) {
      return params.node.rowIndex % 2 === 0;
    },
    even: function (params) {
      return params.node.rowIndex % 2 !== 0;
    },
  };

  const defaultColDef = {
    flex: 1,
    resizable: true,
    filter: true,
    sortable: true,
    floatingFilter: true,
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function handleAdd() {
    setOpenAddForm(true);
  }
  return (
    <div className="col col-full pl-48 pr-48">
      {!isAllowed("quanlytaichinh_group", "view_waterelectrical") ? (
        <div className="align-item-ct">
          <Permissionless />
        </div>
      ) : loader ? (
        <div className="align-item-ct">
          <Loader />
        </div>
      ) : (
        <div>
          {area && (
            <div>
              <div className="col col-full">
                <div className="col col-5 pt-24">
                  <Button
                    type="normal-blue"
                    content="Thêm"
                    isDisable={
                      !isAllowed("quanlytaichinh_group", "add_revenue")
                    }
                    onClick={handleAdd}
                  />
                </div>
                <div className="col col-5  pd-8">
                  <Typography>Chọn tháng</Typography>
                  <select
                    name="month"
                    className="form-control"
                    value={selection.month}
                    onChange={(event) => handleTimeChange(event)}
                  >
                    {month.map((value, index) => {
                      return (
                        <option key={index} value={value.value}>
                          {value.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col col-5 pd-8">
                  <Typography>Chọn năm</Typography>
                  <select
                    name="year"
                    className="form-control"
                    value={selection.year}
                    onChange={(event) => handleTimeChange(event)}
                  >
                    {year.map((value, index) => {
                      return (
                        <option key={index} value={value.value}>
                          {value.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col col-5 pd-8">
                  <Typography>Chọn khu</Typography>
                  <select
                    name="area"
                    className="form-control"
                    value={selection.area}
                    onChange={(event) => handleTimeChange(event)}
                  >
                    {area.map((value, index) => {
                      return (
                        <option key={index} value={value.slug}>
                          {value.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col col-full">
                <div className={"col col-full ag-theme-alpine grid"}>
                  <AgGridReact
                    animateRows
                    enableColResize
                    pagination={true}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowClassRules={rowClassRules}
                    onCellClicked={handleCellClicked}
                    getRowNodeId={(data) => data.name}
                    onGridReady={onGridReady}
                    rowData={tableData}
                    paginationAutoPageSize={true}
                  />
                </div>
              </div>
              <ReactModal
                isOpen={isModalVisible}
                onRequestClose={hideModal}
                style={customStyles}
                ariaHideApp={false}
              >
                <ShowBill
                  selectedMonth={selection.month}
                  selectedYear={selection.year}
                  area={area.find((ele) => ele.slug === selection.area).name}
                  rowSelected={roomSelected}
                  onCancel={onCancel}
                  isUpdate={() => setUpdate((prev) => !prev)}
                />
              </ReactModal>
              <ReactModal
                isOpen={openAddForm}
                onRequestClose={() => setOpenAddForm(false)}
                style={customStyles}
                ariaHideApp={false}
              >
                <AddIndex
                  units={addSelectionList.prices}
                  rooms={addSelectionList.rooms}
                  onCancel={() => setOpenAddForm(false)}
                  isUpdate={() => setUpdate((prev) => !prev)}
                />
              </ReactModal>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
