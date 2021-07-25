import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import PlusIcon from "@material-ui/icons/AddBox";
import { createWaterElectricalIndex } from "../../../../redux/actions/financial";

export default function AddIndex(props) {
  const { rooms, units, onCancel, isUpdate } = props;

  const current = new Date();

  const [dataSend, setDataSend] = useState({
    room: 3,
    new_index_eclectrical: 0,
    new_index_water: 0,
    month: current.getMonth() + 1,
    year: current.getFullYear(),
    water_electrical_unit_price: 1,
  });

  function handleChange(e) {
    const { value, name } = e.target;
    setDataSend({ ...dataSend, [name]: value });
  }
  function onAdd() {
    createWaterElectricalIndex(dataSend, (output) => {
      if (output) {
        if (output.status === "successful") {
          alert("Tạo nhật thành công");
          isUpdate();
          onCancel();
        } else alert(output.notification);
      }
    });
  }
  return (
    <div>
      <div className="col modal text-align-ct">
        <h2>Nhập thông tin mới</h2>
        <div className="col col-full pd-24">
          <Box display="flex">
            <Box marginBottom={3} marginRight={3}>
              <TextField
                name="year"
                label="Năm"
                InputProps={{
                  inputProps: {
                    min: current.getFullYear() - 2,
                    step: 1,
                  },
                }}
                value={dataSend.year}
                onChange={handleChange}
                variant="outlined"
                size="small"
                type="number"
              />
            </Box>
            <Box marginBottom={3}>
              <TextField
                name="month"
                label="Tháng"
                InputProps={{
                  inputProps: {
                    min: 1,
                    year: 12,
                    step: 1,
                  },
                }}
                value={dataSend.month}
                onChange={handleChange}
                variant="outlined"
                size="small"
                type="number"
              />
            </Box>
          </Box>
          <Box display="flex">
            <Box width="100%" marginBottom={3} marginRight={3}>
              <TextField
                name="room"
                label="Phòng"
                value={dataSend.room}
                onChange={handleChange}
                variant="outlined"
                size="small"
                select
                style={{ width: "100%" }}
                inputStyle={{ width: "100%" }}
              >
                {rooms.map((value, index) => {
                  return (
                    <MenuItem key={index} value={value.id}>
                      {value.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Box>
            <Box width="100%" marginBottom={3}>
              <TextField
                name="water_electrical_unit_price"
                label="Đơn giá"
                value={dataSend.water_electrical_unit_price}
                onChange={handleChange}
                variant="outlined"
                size="small"
                style={{ width: "100%" }}
                inputStyle={{ width: "100%" }}
                select
              >
                {units.map((value, index) => {
                  return (
                    <MenuItem key={index} value={value.id}>
                      {value.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Box>
          </Box>
          <Box display="flex">
            <Box marginBottom={3} marginRight={3}>
              <TextField
                name="new_index_water"
                label="Số nước mới"
                InputProps={{
                  inputProps: {
                    min: 0,
                    step: 1,
                  },
                }}
                value={dataSend.new_index_water}
                onChange={handleChange}
                variant="outlined"
                size="small"
                type="number"
              />
            </Box>
            <Box marginBottom={3}>
              <TextField
                name="new_index_electrical"
                label="Số điện mới"
                InputProps={{
                  inputProps: {
                    min: 0,
                    step: 1,
                  },
                }}
                value={dataSend.new_index_eclectrical}
                onChange={handleChange}
                variant="outlined"
                size="small"
                type="number"
              />
            </Box>
          </Box>
          <Box marginBottom={3} marginRight={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={onCancel}
              startIcon={<CancelPresentationIcon></CancelPresentationIcon>}
            >
              Huỷ
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onAdd}
              style={{ left: "10%" }}
              startIcon={<PlusIcon></PlusIcon>}
            >
              Tạo
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}
