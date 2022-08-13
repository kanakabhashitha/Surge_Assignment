import { React, useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/ResetUserPage";
import { useAppContext } from "../context/appContext";
import { useNavigate, useParams } from "react-router-dom";
import OtpInput from "react-otp-input";

const initialState = {
  firstName: "",
  lastName: "",
  newPassword: "",
  confirmPassword: "",
  dateOfBirth: "",
  mobile: "",
};

const ResetUser = () => {
  const { user, showAlert, displayAlert, resetUser } = useAppContext();

  const [values, setValues] = useState(initialState);
  const [tempPassword, setTempPassword] = useState();

  const navigate = useNavigate();
  const param = useParams();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const id = param.id;
    const {
      firstName,
      lastName,
      newPassword,
      confirmPassword,
      dateOfBirth,
      mobile,
    } = values;

    if (
      !firstName ||
      !lastName ||
      !tempPassword ||
      !newPassword ||
      !confirmPassword ||
      !dateOfBirth ||
      !mobile
    ) {
      displayAlert();
      return;
    }

    const currentUser = {
      id,
      firstName,
      lastName,
      newPassword,
      confirmPassword,
      tempPassword,
      dateOfBirth,
      mobile,
    };

    resetUser(currentUser);

    clearValues();
  };

  const clearValues = () => {
    values.firstName = "";
    values.lastName = "";
    values.newPassword = "";
    values.confirmPassword = "";
    values.dateOfBirth = "";
    values.mobile = "";
    setTempPassword("");
    setValues({ ...values });
  };

  useEffect(() => {
    if (user && user.status === true) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <Logo />

        <h3>Student Details</h3>

        <hr />
        <h5>Please enter all details and reset your profile</h5>

        {showAlert && <Alert />}
        <div className="row-container">
          {/* name input */}

          <FormRow
            type="text"
            name="firstName"
            labelText="first name"
            value={values.firstName}
            handleChange={handleChange}
          />

          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            value={values.lastName}
            handleChange={handleChange}
          />

          <FormRow
            type="number"
            name="mobile"
            labelText="contact number"
            value={values.mobile}
            handleChange={handleChange}
          />

          <FormRow
            type="Date"
            name="dateOfBirth"
            labelText="Date of birthday"
            value={values.dateOfBirth}
            handleChange={handleChange}
          />

          <FormRow
            type="password"
            name="newPassword"
            labelText="new password"
            value={values.newPassword}
            handleChange={handleChange}
          />

          <FormRow
            type="password"
            name="confirmPassword"
            labelText="confirm password"
            value={values.confirmPassword}
            handleChange={handleChange}
          />
        </div>

        <h5>
          A verification code has been sent to the email address you entered
        </h5>
        <div className="otp-field">
          <OtpInput
            value={tempPassword}
            onChange={setTempPassword}
            otpType="number"
            isInputSecure="true"
            numInputs={5}
            inputStyle="otp-form-input"
            separator={<span> </span>}
          />
        </div>

        <div className="btn-container">
          <button type="submit" className="btn btn-block">
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
      </form>
    </Wrapper>
  );
};

export default ResetUser;
