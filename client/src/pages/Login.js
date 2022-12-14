import { React, useState, useEffect } from "react";
import { Logo, FormRow, FormRowSelect, Alert } from "../components";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/LoginPage";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
  accountType: "",
  accountTypeOptions: ["Admin", "Student"],
  showAlert: false,
};

const Login = () => {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();

  const { user, isLoading, showAlert, displayAlert, loginUser } =
    useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, accountType } = values;
    if (!email || !password || !accountType) {
      displayAlert();
      return;
    }
    const currentUser = { email, password, accountType };
    loginUser(currentUser);
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <Logo />

        <h3> Login</h3>

        {showAlert && <Alert />}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        {/* account type */}
        <FormRowSelect
          name="accountType"
          labelText="account type"
          value={values.accountType}
          handleChange={handleChange}
          list={values.accountTypeOptions}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
      </form>
    </Wrapper>
  );
};

export default Login;
