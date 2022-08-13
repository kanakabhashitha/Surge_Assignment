import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/userContainer";
import UserRow from "./UserRow";
import { Table } from "react-bootstrap";

const UserContainer = () => {
  const {
    getAllUser,
    users,
    isLoading,
    page,
    numOfPages,
    totalUser,
    search,
    sort,
  } = useAppContext();

  useEffect(() => {
    getAllUser();
  }, [page, search, sort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (users.length === 0) {
    return (
      <Wrapper>
        <h2>No users to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalUser} user{users.length > 1 && "s"} found
      </h5>

      <div>
        <Table bordered hover size="sm" className="table text-center">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date Of Birthday</th>
              <th>Contact Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return <UserRow key={user._id} {...user} />;
            })}
          </tbody>
        </Table>
      </div>

      {/* {numOfPages > 1 && <PageBtnContainer />} */}
    </Wrapper>
  );
};

export default UserContainer;
