import { Button, makeStyles } from "@material-ui/core";
import ReactModal from "react-modal";
import "./styles.css";

const YesNoModal = ({
  isModalVisible,
  hideModal,
  title,
  message,
  okText,
  cancelText,
  onOk,
  onCancel,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "70%",
      bottom: "auto%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
      marginLeft: "20px",
    },
    overlay: { zIndex: 1000 },
  };
  const useStyles = makeStyles({
    flexGrow: {
      flex: "1",
    },
    buttoncancel: {
      backgroundColor: "red",
      color: "white",
      "&:hover": {
        backgroundColor: "rgb(146, 3, 3)",
        color: "white",
      },
    },
    buttonok: {
      backgroundColor: " rgb(0, 162, 255)",
      color: "white",
      width: "80px",
      marginLeft: "20px",
      "&:hover": {
        backgroundColor: "rgb(2, 80, 126)",
        color: "white",
      },
    },
  });
  const classes = useStyles();

  return (
    <ReactModal
      isOpen={isModalVisible}
      onRequestClose={hideModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="yes-no-modal__title">{title}</div>
      <div className="yes-no-modal__message">{message}</div>
      <div className="yes-no-modal__button">
        <Button className={classes.buttoncancel} onClick={onCancel}>
          {cancelText}
        </Button>
        <Button className={classes.buttonok} onClick={onOk}>
          {okText}
        </Button>
      </div>
    </ReactModal>
  );
};

export default YesNoModal;
