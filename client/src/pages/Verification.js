import { React, useState, useEffect } from "react";
import { Loading, Alert } from "../components";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import success from "../assets/images/success.svg";
import Wrapper from "../assets/wrappers/VerifyPage";

const Verification = () => {
  const { verifyUser, showAlert, displayAlert, isLoading, verify } =
    useAppContext();
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;

  const emailVerify = () => {
    const url = `http://localhost:3000/api/v1/auth/verify/${id}`;
    verifyUser(url);
  };

  useEffect(() => {
    emailVerify();

    displayAlert();

    setTimeout(() => {
      navigate(`/reset-user/${id}`);
    }, 4000);
  }, [param, navigate]);

  return (
    <Wrapper>
      {verify && <img src={success} alt="success_img" />}
      {isLoading && <Loading center class="loading" />}
      {showAlert && <Alert />}
      <h1>Email verified successfully</h1>
    </Wrapper>
  );
};

export default Verification;
