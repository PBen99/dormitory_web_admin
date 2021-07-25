import "./styles.css";
import moment from "moment";
import Button from "../../../../components/common/Button";
export default function NotificationList(props) {
  const { notification, handleConfirm } = props;

  return (
    <div className="notification-item-box">
      <div className="col col-full">
        <div className="col notification-item-box__title">
          {notification.title}
        </div>
        <div className="float-right">
          <Button
            size="small"
            type="normal-red"
            content="Xóa"
            isDisable={false}
            onClick={() => handleConfirm(notification.public_id)}
          />
        </div>
      </div>
      <div className="col col-full notification-item-box__content">
        {notification.content}
      </div>
      <div className="col col-full notification-item-box__footer">
        Tạo bởi:{" "}
        <span>
          {notification.created_by
            ? notification.created_by.first_name +
              notification.created_by.last_name
            : ""}
        </span>
      </div>
      <div className="notification-item-box__footer">{`(${moment(
        notification.last_update
      ).format("DD/MM/YYYY HH:mm")})`}</div>
    </div>
  );
}
