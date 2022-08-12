import { React, useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/addUser";

const initialState = {
  firstName: "",
  email: "",
  showAlert: false,
};

const AddUser = () => {
  const [values, setValues] = useState(initialState);
  const { addUser, isLoading, showAlert, displayAlert } = useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const clearValues = () => {
    values.firstName = "";
    values.email = "";
    setValues({ ...values });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { firstName, email } = values;

    if (!email || !firstName) {
      displayAlert();
      return;
    }

    const currentUser = { firstName, email };

    addUser(currentUser);

    clearValues();
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <h3> add student</h3>

        {showAlert && <Alert />}

        <div className="form-center ">
          {/* first name input */}
          <FormRow
            type="text"
            name="firstName"
            labelText="first name"
            value={values.firstName}
            handleChange={handleChange}
          />

          {/* email input */}
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />

          {/* btn container */}
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
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

export default AddUser;
