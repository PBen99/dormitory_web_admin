import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import {
  withStyles,
} from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import { getAuth } from "../../../../utilities/helper";
import { useState } from "react";

export default function NotificationForm(rowUser) {
  const user = getAuth();
  const [dataSend, setDataSend] = useState({
    from: "",
    to: "",
    notification: "",
  });
  const handleClick = () => {

  };
  const SendButton = withStyles((theme) => ({
    root: {
      width: "100px",
    },
  }))(Button);

  const handleChange = (event) => {
    const name = event.target.name;
    const data = event.target.value;
    setDataSend({ ...dataSend, [name]: data });
  };
  return (
    <Box>
      <Box>
        <Typography variant="h6">Gửi thông báo</Typography>
      </Box>
      <Box marginTop={3}>
        <TextField
          id="outlined-helperText"
          label="Từ"
          name={"from"}
          defaultValue={`${user.first_name} ${user.last_name}`}
          variant="outlined"
          onChange={handleChange}
          size="small"
        />
      </Box>
      <Box marginTop={3}>
        <TextField
          id="outlined-helperText"
          label="Đến"
          name={"to"}
          onChange={handleChange}
          defaultValue={rowUser.rowUser.account}
          disabled
          placeholder="Email người nhận"
          variant="outlined"
          size="small"
        />
      </Box>
      <Box marginTop={3}>
        <TextField
          id="outlined-helperText"
          label="Thông báo"
          placeholder="Thông báo"
          onChange={handleChange}
          name={"notification"}
          variant="outlined"
          fullWidth
          rows={4}
          multiline
        />
      </Box>
      <Box textAlign="center" marginTop={3}>
        <SendButton variant="contained" color="primary" onClick={handleClick}>
          Gửi
        </SendButton>
      </Box>
    </Box>
  );
}
