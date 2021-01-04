import { act } from "react-dom/test-utils";

const initialState = {
  // Signup Spinner
  saving: false,
  // Login Spinner
  logginIn: false,
  // Both
  error: null,
  token: null,
  userId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_USER_START":
      return {
        ...state,
        saving: true,
      };
    case "SIGNUP_USER_SUCCESS":
      return {
        ...state,
        saving: false,
        error: null,
        token: action.token,
        userId: action.userId,
      };
    case "SIGNUP_USER_ERROR":
      console.log("Firebase error: ", action.error);
      return {
        ...state,
        saving: false,
        error: action.error.response.data.error.message,
      };
    case "LOGIN_USER_START":
      return {
        ...state,
        logginIn: true,
      };
    case "LOGIN_USER_SUCCESS":
      return {
        ...state,
        logginIn: false,
        error: null,
        token: action.token,
        userId: action.userId,
      };
    case "LOGIN_USER_ERROR":
      console.log("Firebase error: ", action.error);
      return {
        ...state,
        logginIn: false,
        error: action.error.response.data.error.message,
      };
    case "LOGOUT":
      return {
        ...state,
        userId: null,
        token: null,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
