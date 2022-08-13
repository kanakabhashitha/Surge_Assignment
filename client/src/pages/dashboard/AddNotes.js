import React, { useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/NoteFormPage";
const initialState = {
  subject: "",
  title: "",
  description: "",
  deadline: "",
};

const AddNotes = () => {
  const { isLoading, showAlert, displayAlert, createNote } = useAppContext();
  const [values, setValues] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { subject, title, deadline, description } = values;

    if (!subject || !title || !deadline || !description) {
      displayAlert();
      return;
    }

    const formData = {
      subject,
      title,
      description,
      deadline,
    };

    createNote(formData);
    clearValues();
  };

  const handleNoteInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const clearValues = () => {
    values.subject = "";
    values.title = "";
    values.deadline = "";
    values.description = "";
    setValues({ ...values });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>add note</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* subject */}
          <FormRow
            type="text"
            name="subject"
            value={values.subject}
            handleChange={handleNoteInput}
          />

          {/* title */}
          <FormRow
            type="text"
            name="title"
            value={values.title}
            handleChange={handleNoteInput}
          />

          {/* deadline */}
          <FormRow
            type="Date"
            name="deadline"
            value={values.deadline}
            handleChange={handleNoteInput}
          />

          {/* description */}
          <FormRow
            type="text"
            name="description"
            value={values.description}
            handleChange={handleNoteInput}
          />

          {/* btn container */}
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddNotes;
