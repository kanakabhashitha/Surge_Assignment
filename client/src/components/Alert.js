import React from "react";

import { useAppContext } from "../context/appContext";

function Alert(props) {
  const { alertText, alertType } = useAppContext();

  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
}

export default Alert;
