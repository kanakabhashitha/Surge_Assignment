import React from "react";
import { NavLink } from "react-router-dom";
import { RiGroupLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";

const AdminTab = () => {
  return (
    <>
      <NavLink
        to="all-user"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <span className="icon">
          <FiUsers />
        </span>
        all student
      </NavLink>

      <NavLink
        to="add-user"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <span className="icon">
          <RiGroupLine />
        </span>
        add student
      </NavLink>
    </>
  );
};

export default AdminTab;
