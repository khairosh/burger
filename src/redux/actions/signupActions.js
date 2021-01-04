import axios from "axios";
import * as loginActions from "./loginActions";

export const signupUser = (email, password) => {
  return function (dispatch) {
    dispatch(signupUserStart());

    // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
    //AIzaSyCSfzAXHoRLarvFYFEB81_AaBnqlecVJ8E

    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSfzAXHoRLarvFYFEB81_AaBnqlecVJ8E";

    const data = {
      email,
      password,
      returnSecureToken: true,
    };

    axios
      .post(url, data)
      .then((result) => {
        const userId = result.data.localId;
        const token = result.data.idToken;
        const expiresIn = parseInt(result.data.expiresIn);
        const refreshToken = result.data.refreshToken;
        const expireDate = new Date(new Date().getTime() + expiresIn * 1000);

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("expireDate", expireDate);
        localStorage.setItem("refreshToken", refreshToken);

        dispatch(signupUserSuccess(userId, token));
        loginActions.autoLogout(expiresIn * 1000);
      })
      .catch((error) => {
        dispatch(signupUserError(error));
      });
  };
};

export const signupUserStart = () => {
  return { type: "SIGNUP_USER_START" };
};

export const signupUserSuccess = (userId, token) => {
  return { type: "SIGNUP_USER_SUCCESS", userId, token };
};

export const signupUserError = (error) => {
  return { type: "SIGNUP_USER_ERROR", error };
};
