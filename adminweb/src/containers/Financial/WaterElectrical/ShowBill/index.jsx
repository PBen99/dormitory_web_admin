import React, { useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import PlusIcon from "@material-ui/icons/AddBox";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import {
  updateWaterElectricalIndex,
  deleteWaterElectricalIndex,
} from "../../../../redux/actions/financial";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function ShowBill({
  selectedMonth,
  selectedYear,
  area,
  rowSelected,
  onCancel,
  isUpdate,
}) {
  const classes = useStyles();

  const [dataSend, setDataSend] = useState({
    room: rowSelected.roomId,
    new_index_eclectrical: rowSelected.new_index_electrical,
    new_index_water: rowSelected.new_index_water,
    month: selectedMonth,
    year: selectedYear,
    water_electrical_unit_price: rowSelected.water_electrical_unit_price_id,
  });

  const handleClickCreate = () => {
    updateWaterElectricalIndex(rowSelected.public_id, dataSend, (output) => {
      if (output.status === "successful") {
        alert("Cập nhật thành công");
        isUpdate();
        onCancel();
      } else alert(output.notification);
    });
  };

  function onDelete() {
    deleteWaterElectricalIndex(rowSelected.public_id, (output) => {
      if (output.status === "successful") {
        alert("Xóa thành công");
        isUpdate();
        onCancel();
      } else alert(output.notification);
    });
  }
  const handleChange = (event) => {
    const id = event.target.id;
    const data = event.target.value;
    setDataSend({ ...dataSend, [id]: parseInt(data) });
  };
  return (
    <div className={classes.root}>
        <div>
          <Box display="flex">
            <Box marginBottom={3} marginRight={3}>
              <TextField
                id="year"
                label="Năm"
                variant="outlined"
                size="small"
                type="number"
                defaultValue={dataSend.year}
                disabled
                className={"cmp-input-disabled"}
              />
            </Box>
            <Box marginBottom={3}>
              <TextField
                label="Tháng"
                id={"month"}
                defaultValue={dataSend.month}
                variant="outlined"
                size="small"
                disabled
              />
            </Box>
          </Box>
          <Box display="flex">
            <Box marginBottom={3} marginRight={3}>
              <TextField
                id="created_at"
                label="Ngày tạo"
                variant="outlined"
                size="small"
                defaultValue={moment(new Date(rowSelected.created_at)).format(
                  "DD/MM/YYYY hh:mm"
                )}
                disabled
                className={"cmp-input-disabled"}
              />
            </Box>
            <Box marginBottom={3}>
              <TextField
                label="Người tạo"
                id="created_by"
                value={`${rowSelected.name}`}
                variant="outlined"
                size="small"
                disabled
              />
            </Box>
          </Box>
          <Box display="flex">
            <Box marginBottom={3} marginRight={3}>
              <TextField
                label="Khu"
                id="area"
                defaultValue={`${area}`}
                variant="outlined"
                size="small"
                disabled
              />
            </Box>
            <Box marginBottom={3}>
              <TextField
                label="Phòng"
                id={"room"}
                defaultValue={`${rowSelected.room}`}
                variant="outlined"
                size="small"
                disabled
              />
            </Box>
          </Box>

          <Box display="flex">
            <Box marginBottom={3} marginRight={3}>
              <TextField
                id="oldElectricalNumber"
                label="Số điện cũ"
                InputProps={{
                  inputProps: {
                    min: 1,
                    step: 1,
                  },
                }}
                disabled
                value={`${rowSelected.old_index_electrical}`}
                variant="outlined"
                size="small"
                type="number"
              />
            </Box>
            <Box marginBottom={3}>
              <TextField
                label="Số nước cũ"
                id={"oldWaterNumber"}
                value={`${rowSelected.old_index_water}`}
                variant="outlined"
                size="small"
                type="number"
                disabled
                InputProps={{
                  inputProps: {
                    min: 1,
                    step: 1,
                  },
                }}
              />
            </Box>
          </Box>
          <Box display="flex">
            <Box marginBottom={3} marginRight={3}>
              <TextField
                id="new_index_eclectrical"
                label="Số điện mới"
                InputProps={{
                  inputProps: {
                    min: rowSelected.new_index_eclectrical,
                    step: 1,
                  },
                }}
                value={`${dataSend.new_index_eclectrical}`}
                onChange={handleChange}
                variant="outlined"
                size="small"
                type="number"
                disabled={rowSelected.isPaid}
              />
            </Box>
            <Box marginBottom={3}>
              <TextField
                label="Số nước mới"
                id="new_index_water"
                type="number"
                value={`${dataSend.new_index_water}`}
                variant="outlined"
                onChange={handleChange}
                size="small"
                InputProps={{
                  inputProps: {
                    min: rowSelected.new_index_water,
                    step: 1,
                  },
                }}
                disabled={rowSelected.isPaid}
              />
            </Box>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={onCancel}
              style={{ left: "15%" }}
              startIcon={<CancelPresentationIcon></CancelPresentationIcon>}
            >
              Huỷ
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={onDelete}
              style={{ left: "25%" }}
              startIcon={<CancelPresentationIcon></CancelPresentationIcon>}
            >
              Xóa
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickCreate}
              style={{ left: "35%" }}
              startIcon={<PlusIcon></PlusIcon>}
            >
              Save
            </Button>
          </Box>
        </div>
    </div>
  );
}
