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
  users: [],
  token: token,
  verify: false,
  totalUser: 0,
  numOfPages: 1,
  page: 1,
  isEditing: false,
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  notes: [],
  totalNote: 0,
  editNoteId: "",
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
    removeUserFromLocalStorage();
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

      removeUserFromLocalStorage();
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

  //get all users
  const getAllUser = async () => {
    const { search, page, sort } = state;

    let url = `/api/v1/auth?page=${page}&sort=${sort}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_USER_BEGIN });

    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });

      const { users, totalUser, numOfPages } = data;

      dispatch({
        type: GET_USER_SUCCESS,
        payload: {
          users,
          totalUser,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
      logoutUser();
    }
    clearAlert();
  };

  //add note
  const createNote = async (formData) => {
    dispatch({ type: ADD_NOTES_BEGIN });

    try {
      const response = await axios.post("/api/v1/notes", formData, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });

      console.log(response);
      dispatch({ type: ADD_NOTES_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: ADD_NOTES_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  //get all notes
  const getAllNotes = async () => {
    const { search, page, sort } = state;

    let url = `/api/v1/notes?page=${page}&sort=${sort}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_NOTES_BEGIN });

    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });

      const { notes, totalNote, numOfPages } = data;

      dispatch({
        type: GET_NOTES_SUCCESS,
        payload: {
          notes,
          totalNote,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
      // logoutUser();
    }
    clearAlert();
  };

  //update document
  const setEdiNotes = (id) => {
    dispatch({ type: SET_EDIT_NOTE, payload: { id } });
  };

  const editDocument = async (formData) => {
    dispatch({ type: EDIT_NOTE_BEGIN });

    try {
      await axios.put(`/api/v1/notes/${state.editDocId}`, formData, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });

      dispatch({ type: EDIT_NOTE_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_NOTE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  //
  //
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
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
        getAllUser,
        clearFilters,
        changePage,
        createNote,
        getAllNotes,
        handleChange,
        setEdiNotes,
        editDocument,
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
