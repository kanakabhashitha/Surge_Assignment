import React, { useReducer, useContext } from "react";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  ADD_USER_BEGIN,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  VERIFY_USER_BEGIN,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_ERROR,
  RESET_USER_BEGIN,
  RESET_USER_SUCCESS,
  RESET_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  CLEAR_VALUES,
  HANDLE_CHANGE,
} from "./actions";

import reducer from "./reducer";
import axios from "axios";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  verify: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //display alert
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  //clear alert
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  //clear values
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  //save user to local storage
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  //remove user form local storage
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  //add user
  const addUser = async (currentUser) => {
    dispatch({ type: ADD_USER_BEGIN });

    try {
      const response = await axios.post("/api/v1/auth/add-user", currentUser);

      const { user, token } = response.data;

      dispatch({
        type: ADD_USER_SUCCESS,
        payload: { user, token },
      });

      //local storage
      addUserToLocalStorage({ user, token });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: ADD_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  //verified user
  const verifyUser = async (url) => {
    dispatch({ type: VERIFY_USER_BEGIN });

    try {
      const response = await axios.post(url);
      console.log(response);
      const { verify } = response.data;

      dispatch({
        type: VERIFY_USER_SUCCESS,
        payload: { verify },
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

  //reset user details
  const resetUser = async (currentUser) => {
    dispatch({ type: RESET_USER_BEGIN });
    try {
      const response = await axios.patch(
        "/api/v1/auth/reset-user",
        currentUser
      );

      const { user, token } = response.data;

      dispatch({
        type: RESET_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: RESET_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
      console.log({ msg: error.response.data.msg });
      removeUserFromLocalStorage();
    }
    clearAlert();
  };

  //login user
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });

    try {
      const response = await axios.post("/api/v1/auth/login", currentUser);
      console.log(response);
      const { user, token } = response.data;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });

      //local storage
      addUserToLocalStorage({ user, token });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  //logout user
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        addUser,
        verifyUser,
        resetUser,
        loginUser,
        logoutUser,
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
