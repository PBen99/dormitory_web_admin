import "./styles.css";
import User from "../layout/User";
import { NavLink } from "react-router-dom";
import { NAVIGATION_TITLE } from "../../utilities/constants/titles";
const AdminNavbar = () => {
  return (
    <header className="header">
      <div className="logo">
        <h4>Quản lý kí túc xá</h4>
      </div>
      <nav className="navigation">
        <div className="nav-links">
          {NAVIGATION_TITLE.map((router, index) => (
            <NavLink
              key={index}
              to={router.path}
              style={{ textDecoration: "none" }}
              activeClassName="style-activeNavlink"
              className="style-navLink bold-text"
            >
              <span>{router.title}</span>
            </NavLink>
          ))}
        </div>
        <div className={"user"}>
          <User />
        </div>
      </nav>
    </header>
  );
};
export default AdminNavbar;
