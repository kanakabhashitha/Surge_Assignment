import React from "react";
import moment from "moment";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";

const NoteRow = ({ _id, title, subject, deadline, description }) => {
  const { setEdiNotes, deleteNotes } = useAppContext();
  let date = moment(deadline);
  date = date.format("MMM Do, YYYY");

  return (
    <>
      <tr>
        <td>{title}</td>
        <td>{subject}</td>
        <td>{date}</td>
        <td>{description}</td>

        <td className="actions">
          <Link
            to="/edit-note"
            className="btn edit-btn"
            onClick={() => setEdiNotes(_id)}
          >
            Edit
          </Link>

          <button
            type="button"
            className="btn delete-btn"
            onClick={() => deleteNotes(_id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default NoteRow;
