import React from "react";
import Wrapper from "../assets/wrappers/Sidebar";
import { useAppContext } from "../context/appContext";
import { AdminTab, StudentTab } from "../components/index";

import Logo from "./Logo";

function Sidebar(props) {
  const { user } = useAppContext();

  return (
    <Wrapper>
      <div className="sidebar-container show-sidebar">
        <div className="content">
          <header>
            <Logo />
          </header>
          {user.accountType === "Admin" ? <AdminTab /> : <StudentTab />}
        </div>
      </div>
    </Wrapper>
  );
}

export default Sidebar;
