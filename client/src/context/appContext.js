import React, { useReducer, useContext } from "react";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  VERIFY_USER_BEGIN,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_ERROR,
} from "./actions";

import reducer from "./reducer";
import axios from "axios";

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  // token: token,
  user: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  //verified user
  const verifyUser = async (OTP) => {
    dispatch({ type: VERIFY_USER_BEGIN });

    try {
      const response = await axios.post("api/v1/auth/verify", OTP, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      console.log(response);
      const { token } = response.data;

      dispatch({
        type: VERIFY_USER_SUCCESS,
        payload: { token },
      });
    } catch (error) {
      console.log(error.response);

      dispatch({
        type: VERIFY_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        verifyUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
