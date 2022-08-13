import React, { useState, useEffect } from "react";
import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/NoteFormPage";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const EditNote = () => {
  const {
    editNotes,
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    notes,
    editNoteId,
  } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isEditing) {
      navigate("/all-notes");
    }
  }, [isEditing, navigate]);

  const note = notes.find((note) => note._id === editNoteId);

  const [title, setTitle] = useState(isEditing && note.title);
  const [subject, setSubject] = useState(isEditing && note.subject);
  const [description, setDescription] = useState(isEditing && note.description);
  const [deadline, setDeadline] = useState(isEditing && note.deadline);

  let date = moment(deadline);
  date = date.format("MMM Do, YYYY");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !subject || !description || !deadline) {
      displayAlert();
      return;
    }

    editNotes({ title, subject, description, deadline });

    setTimeout(() => {
      navigate("/all-notes");
    }, 3000);
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>update notes</h3>

        {showAlert && <Alert />}

        <div className="form-center">
          {/* title */}
          <FormRow
            type="text"
            name="title"
            labelText="title"
            value={title}
            handleChange={(e) => setTitle(e.target.value)}
          />
          {/* subject */}
          <FormRow
            type="text"
            labelText="subject"
            name="subject"
            value={subject}
            handleChange={(e) => setSubject(e.target.value)}
          />
          {/* description */}
          <FormRow
            type="text"
            labelText="description"
            name="description"
            value={description}
            handleChange={(e) => setDescription(e.target.value)}
          />

          {/* description */}
          <FormRow
            type="text"
            labelText="deadline"
            name="deadline"
            value={date}
            handleChange={(e) => setDeadline()}
          />

          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default EditNote;
