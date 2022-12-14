import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import { useAppContext } from "../context/appContext";

function Navbar(props) {
  const { user, logoutUser } = useAppContext();

  const [showLogout, setShowLogout] = useState(false);

  return (
    <Wrapper>
      <div className="nav-center">
        <div>
          <Logo />
          <h3 className="logo-text">
            {user.accountType === "Admin" && "dashboard"}
          </h3>
        </div>

        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user && user.firstName}
            <FaCaretDown />
          </button>

          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" onClick={logoutUser} className="dropdown-btn">
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Navbar;
