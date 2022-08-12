import { React, useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  cPassword: "",
  dateOfBirth: "",
  mobile: "",
  accountType: "",
  status: "",
  showAlert: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();
  const { user, isLoading, showAlert, displayAlert, registerUser } =
    useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    const currentUser = { name, email, password };

    if (isMember) {
      //   setupUser({
      //     currentUser,
      //     endPoint: "login",
      //     alertText: "Login Successful! Redirecting...",
      //   });
      // } else {
      //   setupUser({
      //     currentUser,
      //     endPoint: "register",
      //     alertText: "User Created! Redirecting...",
      //   });
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     setTimeout(() => {
  //       navigate("/");
  //     }, 3000);
  //   }
  // }, [user, navigate]);

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <Logo />

        <h3>Register</h3>

        {showAlert && <Alert />}

        {/* name input */}

        {!values.isMember && (
          <FormRow
            type="text"
            name="fisrtName"
            value={user.firstName}
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={user.email}
          handleChange={handleChange}
        />

        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <FormRow
          type="password"
          name="cpassword"
          labelText="confirm password"
          value={values.cpassword}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
      </form>
    </Wrapper>
  );
};

export default Register;
