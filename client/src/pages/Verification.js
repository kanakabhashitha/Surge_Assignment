import { React, useState } from "react";
import { Logo, Alert } from "../components";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import OtpInput from "react-otp-input";
import Wrapper from "../assets/wrappers/VerifyForm";

const Verification = () => {
  const { verifyUser, showAlert, displayAlert, isLoading } = useAppContext();
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const navigate = useNavigate();
  const param = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!temporaryPassword) {
      displayAlert();
      return;
    }

    const id = param.id;
    const url = `http://localhost:3000/api/v1/auth/verify/${id}`;
    const verifyDetails = { temporaryPassword, url };
    verifyUser(verifyDetails);

    setTimeout(() => {
      navigate("/register");
    }, 4000);
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <Logo />

        <h3> Verify your email address</h3>
        <hr />
        <h5>
          A verification code has been sent to the email address you entered
        </h5>
        <article>
          Please check your inbox and enter the verification code below to
          verify your email address. The code will expire in an one hour.
        </article>

        <div className="input-fields">
          <OtpInput
            value={temporaryPassword}
            onChange={setTemporaryPassword}
            otpType="number"
            numInputs={5}
            inputStyle="otp-form-input"
            separator={<span> </span>}
          />
        </div>

        {showAlert && <Alert />}

        <button className="btn btn-block" type="submit" disabled={isLoading}>
          {isLoading ? "Please Wait..." : "verify"}
        </button>
      </form>
    </Wrapper>
  );
};

export default Verification;
