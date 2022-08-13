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
  LOGOUT_USER,
  GET_USER_BEGIN,
  GET_USER_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  ADD_NOTES_BEGIN,
  ADD_NOTES_SUCCESS,
  ADD_NOTES_ERROR,
  GET_NOTES_BEGIN,
  GET_NOTES_SUCCESS,
  HANDLE_CHANGE,
  SET_EDIT_NOTE,
  EDIT_NOTE_BEGIN,
  EDIT_NOTE_SUCCESS,
  EDIT_NOTE_ERROR,
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

  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successful! Redirecting...",
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }

  if (action.type === GET_USER_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      users: action.payload.users,
      totalUser: action.payload.totalUser,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      sort: "latest",
    };
  }

  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }

  if (action.type === ADD_NOTES_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === ADD_NOTES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Note Created!",
    };
  }

  if (action.type === ADD_NOTES_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_NOTES_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_NOTES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      notes: action.payload.notes,
      totalNote: action.payload.totalNote,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === SET_EDIT_NOTE) {
    return {
      ...state,
      isEditing: true,
      editNoteId: action.payload.id,
    };
  }

  if (action.type === EDIT_NOTE_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_NOTE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Note Updated!",
    };
  }

  if (action.type === EDIT_NOTE_ERROR) {
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
