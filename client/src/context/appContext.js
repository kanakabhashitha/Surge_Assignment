import React, { useReducer, useContext } from "react";

import { DISPLAY_ALERT, CLEAR_ALERT } from "./actions";

import reducer from "./reducer";

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
