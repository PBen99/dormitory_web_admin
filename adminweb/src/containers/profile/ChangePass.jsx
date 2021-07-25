import Popup from "reactjs-popup";
import Button from "../../components/common/Button";
import FormError from "../../components/common/FormError";
import InputField from "../../components/common/InputField";

const ChangePass = (props) => {
  const { open, closeModal, errorState, handleInput, savePass } = props;
  return (
    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
      <div className="col modal style-lg-box bg-color-white text-align-ct">
        <h2 className="pt-12">Nhập mật khẩu mới</h2>
        <div className="col col-full pd-24">
          <div className="col col-full mt-24">
            <FormError
              isHidden={errorState.curPass.isHidden}
              errorMessage={errorState.curPass.errorMessage}
            />
            <InputField
              name="curPass"
              isValid={errorState.curPass.isInputValid}
              type="password"
              placeholder="Mật khẩu hiện tại"
              onChange={handleInput}
              autocomplete="off"
            />
          </div>
          <div className="col col-full mt-24">
            <FormError
              isHidden={errorState.newPass.isHidden}
              errorMessage={errorState.newPass.errorMessage}
            />
            <InputField
              name="newPass"
              isValid={errorState.newPass.isInputValid}
              type="password"
              placeholder="Mật khẩu mới"
              onChange={handleInput}
              autocomplete="off"
            />
          </div>
          <div className="col col-full mt-24">
            <div className="col col-half">
              <Button
                type="normal-red"
                content="HỦY"
                isDisable={false}
                onClick={closeModal}
              />
            </div>
            <div className="col col-half">
              <Button
                type="normal-ubg"
                content="LƯU"
                isDisable={false}
                onClick={savePass}
              />
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};
export default ChangePass;
