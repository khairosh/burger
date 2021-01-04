import axios from "axios";

export const loginUser = (email, password) => {
  return function (dispatch) {
    dispatch(loginUserStart());

    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCSfzAXHoRLarvFYFEB81_AaBnqlecVJ8E";

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

        dispatch(loginUserSuccess(userId, token));
        dispatch(autoLogout(expiresIn * 1000));
        // dispatch(autoLogout(5 * 1000));
      })
      .catch((error) => {
        dispatch(loginUserError(error));
      });
  };
};

export const loginUserStart = () => {
  return { type: "LOGIN_USER_START" };
};

export const loginUserSuccess = (userId, token) => {
  return { type: "LOGIN_USER_SUCCESS", userId, token };
};

export const loginUserError = (error) => {
  return { type: "LOGIN_USER_ERROR", error };
};

export const logout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  localStorage.removeItem("expireDate");
  localStorage.removeItem("refreshToken");
  return {
    type: "LOGOUT",
  };
};

// Timer asynchron process
export const autoLogout = (ms) => {
  return function (dispatch) {
    setTimeout(() => {
      dispatch(logout());
    }, ms);
  };
};
