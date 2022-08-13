import React from "react";
import moment from "moment";

const UserRow = ({ _id, firstName, lastName, email, dateOfBirth, mobile }) => {
  let date = moment(dateOfBirth);
  date = date.format("MMM Do, YYYY");

  return (
    <>
      <tr>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{date}</td>
        <td>{mobile}</td>
        <td>{email}</td>
      </tr>
    </>
  );
};

export default UserRow;
