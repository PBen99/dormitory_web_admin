import React from "react";
import Popup from "reactjs-popup";
import Button from "./Button";
const Alertness = (props) => {
  const { open, onClose, type, content, onClick } = props;

  return (
    <div>
      <Popup open={open} closeOnDocumentClick onClose={() => onClose()}>
        <div className="col modal style-lg-box bg-color-white text-align-ct">
          {type === "type-success" && (
            <div className="col col-full pd-8">
              <div className="style-alertness-icon icon-success text-20 pd-8 text-is-green inline-block mr-16">
                <i className="fi-rr-check"></i>
              </div>
              <div className="inline-block text-20 bold-text">Success!</div>
            </div>
          )}
          {type === "type-error" && (
            <div className="col col-full pd-8">
              <div className="style-alertness-icon icon-error text-20 pd-8 text-is-red inline-block mr-16">
                <i className="fi-rr-cross"></i>
              </div>
              <div className="inline-block text-20 bold-text">Oops!</div>
            </div>
          )}
          {type === "type-warning" && (
            <div className="col col-full pd-8">
              <div className="style-alertness-icon icon-warning text-20 pd-8 text-is-orange inline-block mr-16">
                <i className="fi-rr-info"></i>
              </div>
              <div className="inline-block text-20 bold-text">Oops!</div>
            </div>
          )}
          <div className="col col-full mb-16 text-is-grey">
            <span>{content}</span>
          </div>
          <div className={`col ${onClick ? "col-half" : "col-full"}`}>
            <Button
              type="normal-red"
              content="Đóng"
              onClick={onClose}
              isDisable={false}
            />
          </div>
          {onClick && (
            <div className="col col-half">
              <Button
                type="normal-blue"
                content="Có"
                onClick={onClick}
                isDisable={false}
              />
            </div>
          )}
        </div>
      </Popup>
    </div>
  );
};
export default Alertness;
