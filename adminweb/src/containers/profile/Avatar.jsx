import avatar from "../../assets/images/user/default-user.png";
const Avatar = () => {
  return (
    <div className="col style-profile-avatar mt-24">
      <img src={avatar} alt="avatar" />
      <div className="style-edit-avatar">
        <input type="file" style={{ display: "none" }} id="edit-avatar" />
        <label htmlFor="edit-avatar">
          <i className="fi-rr-edit" style={{ cursor: "pointer" }}></i>
        </label>
      </div>
    </div>
  );
};
export default Avatar;
