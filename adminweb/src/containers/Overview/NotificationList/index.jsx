import React, { useState, useEffect } from "react";
import "./styles.css";
import { useSelector } from "react-redux";
import Loader from "../../../components/common/Loader";
import Button from "../../../components/common/Button";
import Box from "@material-ui/core/Box";
import NotificationItem from "./NotificationItem";
import {
  deleteNotification,
  getNotifications,
} from "../../../redux/actions/overview";
import Modal from "react-modal";
import NotificationForm from "../NotificationForm";
import queryString from "query-string";
import Pagination from "../../../components/common/Pagination";
import Alertness from "../../../components/common/Alertness";
import * as ALERTMESSAGE from "../../../utilities/constants/AlertMessage";

export default function NotificationList() {
  const [notifications, setNotifications] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const loader = useSelector((state) => state.overview.loading);

  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 20,
    totals: 1,
  });

  const [filter, setFilter] = useState({
    page: 1,
  });

  const [isUpdate, setUpdate] = useState(false);

  const [openConfirm, setOpenConfirm] = useState({
    isShow: false,
    value: "",
  });

  const [notification, setNotification] = useState({
    type: "",
    content: "",
  });

  const onCloseConfirm = () =>
    setOpenConfirm({ ...openConfirm, isShow: false });

  const onOpenConfirm = (value) =>
    setOpenConfirm({ ...openConfirm, isShow: true, value: value });

  const hideModal = () => {
    setIsModalVisible(false);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "53%",
      right: "50%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: { zIndex: 1000 },
  };

  useEffect(() => {
    const paramsString = queryString.stringify(filter);

    getNotifications(paramsString, (output) => {
      if (output) {
        const pagination = {
          page: output.current_page,
          page_size: output.page_size,
          totals: output.totals,
        };

        setPagination(pagination);
        setNotifications(output.results);
      }
    });
  }, [filter, isUpdate]);

  const handleSendNoti = () => {
    setIsModalVisible(true);
  };

  const handleSuccessSubmit = () => {
    setIsModalVisible(false);

    const paramsString = queryString.stringify(filter);

    getNotifications(paramsString, (output) => {
      if (output) {
        const pagination = {
          page: output.current_page,
          page_size: output.page_size,
          totals: output.totals,
        };

        setPagination(pagination);
        setNotifications(output.results);
      }
    });
  };

  function handlePageChange(newPage) {
    setFilter({ ...filter, page: newPage });
  }

  function handleDelete() {
    var id = openConfirm.value;
    deleteNotification(id, (output) => {
      if (output) {
        setUpdate((prev) => !prev);
        onCloseConfirm();
        alert(output.notification);
      }
    });
  }

  function handleConfirm(value) {
    setNotification({
      type: "type-warning",
      content: ALERTMESSAGE.REMOVAL_CONFIRM,
    });
    onOpenConfirm(value);
  }
  return (
    <div>
      {loader ? (
        <div className="align-item-ct">
          <Loader />
        </div>
      ) : (
        <Box>
          <Button
            type="normal-blue"
            content="Thêm"
            isDisable={false}
            onClick={handleSendNoti}
          />

          <Box className={"notification-area"}>
            <div className="notification-list-box">
              {notifications && (
                <div>
                  {notifications.map((value, index) => {
                    return (
                      <NotificationItem
                        key={index}
                        notification={value}
                        handleConfirm={handleConfirm}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </Box>
          <div className="col col-full">
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
          <div>
            <Alertness
              open={openConfirm.isShow}
              onClose={onCloseConfirm}
              type={notification.type}
              content={notification.content}
              onClick={handleDelete}
            />
          </div>
          <Modal
            isOpen={isModalVisible}
            onRequestClose={hideModal}
            style={customStyles}
            ariaHideApp={false}
          >
            <NotificationForm onSuccess={handleSuccessSubmit} />
          </Modal>
        </Box>
      )}
    </div>
  );
}
