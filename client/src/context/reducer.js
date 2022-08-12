import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  ADD_USER_BEGIN,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  RESET_USER_BEGIN,
  RESET_USER_SUCCESS,
  RESET_USER_ERROR,
  VERIFY_USER_BEGIN,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === ADD_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === ADD_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "User Add Successful",
    };
  }

  if (action.type === ADD_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === VERIFY_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === VERIFY_USER_SUCCESS) {
    return {
      ...state,
      verify: action.payload.verify,
      isLoading: true,
      showAlert: true,
      alertType: "success",
      alertText: "Verify Successful! Redirecting...",
    };
  }

  if (action.type === VERIFY_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === RESET_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === RESET_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "Reset Successful! Redirecting...",
    };
  }
  if (action.type === RESET_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
};

export default reducer;
