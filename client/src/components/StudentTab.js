import React from "react";
import { NavLink } from "react-router-dom";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";

const StudentTab = () => {
  return (
    <div className="nav-links">
      <NavLink
        to="all-notes"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <span className="icon">
          <CgNotes />
        </span>
        all notes
      </NavLink>

      <NavLink
        to="add-notes"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <span className="icon">
          <IoDocumentAttachOutline />
        </span>
        add notes
      </NavLink>
    </div>
  );
};

export default StudentTab;
