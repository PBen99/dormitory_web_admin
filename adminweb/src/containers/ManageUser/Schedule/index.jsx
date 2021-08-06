import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./styles.css";
import Select from "react-select";
import moment from "moment";
import { Button, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Input from "@material-ui/core/Input";
import {
  addDailySchedule,
  getEmployee,
  getSchedule,
} from "../../../redux/actions/humanResource";
import {
  shiftTime,
  week as weekDate,
  typeOption,
} from "../../../utilities/constants/titles";
import { getTimeSheetRender } from "../../../utilities/constants/DataRender/humanResource";
import querystring from "querystring";
import Loader from "../../../components/common/Loader";
import Permissionless from "../../../components/common/Permissionless";
import { isAllowed } from "../../../utilities/helper";

const Employee = () => {
  const current = new Date();

  var currentWeek = moment().format("w") - 1;

  const [time, setTime] = useState({
    week: currentWeek,
    year: current.getFullYear(),
  });

  const [initData, setInitData] = useState();

  const [disable, setDisable] = useState(true);

  const [employeeOption, setEmployeeOption] = useState();

  const loader = useSelector((state) => state.humanResource.loading);

  var week = [];

  for (var i = 1; i <= 52; i++) {
    week.push({
      value: i,
      label: `Tuần thứ ${i}, Từ ${moment(i, "week")
        .startOf("week")
        .format("DD/MM")} đến ${moment(i, "week").endOf("week").format("DD/MM")}
           `,
    });
  }

  const year = [];

  for (var j = current.getFullYear(); j > current.getFullYear() - 5; j--) {
    year.push({ value: j, label: j.toString() });
  }

  useEffect(() => {
    let mounted = true;
    const params = querystring.stringify(time);
    getSchedule(params, (output) => {
      if (output) {
        if (output.status === "fail") {
          if (mounted) {
            setInitData(getTimeSheetRender([], shiftTime.length));
          }
        } else {
          if (mounted) {
            setInitData(getTimeSheetRender(output, shiftTime.length));
          }
        }
      }
    });

    getEmployee((output) => {
      if (output) {
        const data = output.map((value) => {
          return {
            value: value.id,
            label: value.first_name + " " + value.last_name,
          };
        });
        if (mounted) {
          setEmployeeOption(data);
        }
      }
    });
    return () => (mounted = false);
  }, [time]);

  const handleSelectionChange = (event, params, shiftId) => {
    let data = [...initData];
    let temp = data.find((element) => element.shift === shiftId);
    var i = data.indexOf(temp);
    let changedData = { ...temp, [event.name]: params.value };
    data[i] = changedData;
    setInitData(data);
    setDisable(false);
  };

  const handleTypeChange = (event, shiftId) => {
    const { name, value } = event.target;
    let data = [...initData];
    let temp = data.find((element) => element.shift === shiftId);
    var i = data.indexOf(temp);
    let changedData = { ...temp, [name]: value };
    data[i] = changedData;
    setInitData(data);
    setDisable(false);
  };

  const renderTableData = () => {
    return (
      <tbody>
        {shiftTime.map((value, index) => {
          return (
            <tr key={index}>
              <td>{value.label}</td>
              {initData
                .filter((data) => data.shift % shiftTime.length === value.value)
                .map((data, id) => (
                  <td key={id}>
                    <Select
                      name="staff"
                      className="mb-8"
                      options={employeeOption}
                      value={
                        employeeOption.find(
                          (index) =>
                            index.value ===
                            initData.find((i) => i.shift === data.shift).staff
                        ) || ""
                      }
                      onChange={(params, event) =>
                        handleSelectionChange(event, params, data.shift)
                      }
                    />
                    <Select
                      options={typeOption}
                      className="mb-8"
                      placeholder="Loại công việc"
                      name="title"
                      value={
                        typeOption.find(
                          (index) =>
                            index.label ===
                            initData.find((i) => i.shift === data.shift).title
                        ) || ""
                      }
                      onChange={(params, event) =>
                        handleSelectionChange(event, params, data.shift)
                      }
                    />
                    <Input
                      placeholder="Ghi chú"
                      name="content"
                      value={
                        initData.find((i) => i.shift === data.shift).content ||
                        ""
                      }
                      onChange={(event) => handleTypeChange(event, data.shift)}
                    />
                  </td>
                ))}
            </tr>
          );
        })}
      </tbody>
    );
  };

  const handleTimeChange = (params, name) => {
    setTime({ ...time, [name]: params.value });
  };

  const handleSaveSchedule = () => {
    let shifts = initData.filter((element) => element.staff && element.title);
    const data = {
      week: time.week,
      year: time.year,
      schedule: shifts,
    };
    addDailySchedule(data, (output) => {
      if (output) {
        setDisable(true);
      }
    });
  };

  return (
    <div className="col col-full pl-48">
      {!isAllowed("quanlynhansu_group", "view_dailyschedule") ? (
        <div className="align-item-ct">
          <Permissionless />
        </div>
      ) : loader ? (
        <div className="align-item-ct">
          <Loader />
        </div>
      ) : (
        <div>
          {initData && employeeOption && (
            <div>
              <div className="col col-two-third" style={{ marginBottom: "2%" }}>
                <div className="col col-third">
                  <Typography>Lựa chọn tuần</Typography>
                  <Select
                    className="week-select"
                    options={week}
                    value={week.find((index) => index.value === time.week)}
                    onChange={(params) => handleTimeChange(params, "week")}
                  />
                </div>
                <div className="col col-third">
                  <Typography>Lựa chọn năm</Typography>
                  <Select
                    className="week-select"
                    options={year}
                    value={year.find((index) => index.value === time.year)}
                    onChange={(params) => handleTimeChange(params, "year")}
                  />
                </div>
              </div>
              <div className="col col-full">
                <h1 id="title">Bảng phân công công việc</h1>
                <table id="students" style={{ marginLeft: "3%" }}>
                  <thead>
                    <tr>
                      <th style={{ width: "9%" }}></th>
                      {weekDate.map((date, index) => (
                        <th key={index}>{date.label}</th>
                      ))}
                    </tr>
                  </thead>
                  {renderTableData()}
                </table>
              </div>
              <div className="float-right col-6 mt-48 mr-24">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveSchedule}
                  startIcon={<SaveIcon></SaveIcon>}
                  disabled={
                    !isAllowed("quanlynhansu_group", "add_dailyschedule") ||
                    disable
                  }
                >
                  Lưu lịch làm
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Employee;
