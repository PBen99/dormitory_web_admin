import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { createNotification } from "../../../redux/actions/overview";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NotificationForm(props) {
  const { onSuccess } = props;

  const [dataSend, setDataSend] = useState({
    content: "",
    title: "",
    is_display: true,
  });
  const handleClick = () => {
    createNotification(dataSend, (output, isOk) => {
      if (isOk) {
        toast("Gửi thông báo thành công!");
        setTimeout(onSuccess, 4000);
      }
    });
  };

  const SendButton = withStyles((theme) => ({
    root: {
      width: "100px",
    },
  }))(Button);
  const handleChange = (event) => {
    const { value, name } = event.target;
    setDataSend({ ...dataSend, [name]: value });
  };
  return (
    <Box>
      <Box>
        <Typography variant="h6">Gửi thông báo</Typography>
      </Box>
      <Box marginTop={3}>
        <TextField
          id="outlined-helperText"
          label="Tiêu đề"
          placeholder="Tiêu đề"
          onChange={handleChange}
          name={"title"}
          variant="outlined"
          fullWidth
          rows={1}
          multiline
        />
      </Box>
      <Box marginTop={3}>
        <TextField
          id="outlined-helperText"
          label="Thông báo"
          placeholder="Thông báo"
          onChange={handleChange}
          name={"content"}
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
        <ToastContainer />
      </Box>
    </Box>
  );
}
