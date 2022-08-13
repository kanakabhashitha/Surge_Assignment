import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/userContainer";
import NoteRow from "./NoteRow";
import { Table } from "react-bootstrap";
import PageBtnContainer from "./PageBtnContainer";

const NotesContainer = () => {
  const {
    getAllNotes,
    notes,
    isLoading,
    page,
    numOfPages,
    totalNote,
    search,
    sort,
  } = useAppContext();

  useEffect(() => {
    getAllNotes();
  }, [page, search, sort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (notes.length === 0) {
    return (
      <Wrapper>
        <h2>No notes to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalNote} note{notes.length > 1 && "s"} found
      </h5>

      <div>
        <Table bordered hover size="sm" className="table text-center">
          <thead>
            <tr>
              <th>Title</th>
              <th>Subject</th>
              <th>DeadLine</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => {
              return <NoteRow key={note._id} {...note} />;
            })}
          </tbody>
        </Table>
      </div>

      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default NotesContainer;
