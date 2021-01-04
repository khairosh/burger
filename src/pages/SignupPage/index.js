import React, { useState } from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "../../components/General/Button";

import css from "./style.module.css";

import * as actions from "../../redux/actions/signupActions";
import Spinner from "../../components/General/Spinner";

const SignupPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const signup = () => {
    if (password !== passwordConfirm) {
      setError("Нууц үгээ зөв давтана уу!");
      // return;
    } else {
      setError("");
      props.signupUser(email, password);
    }
  };

  return (
    <div className={css.Signup}>
      {props.userId && <Redirect to="/orders" />}
      <h3>Мэдээллээ оруулна уу</h3>
      <input onChange={changeEmail} type="text" placeholder="Имэйл хаяг" />
      <input onChange={changePassword} type="password" placeholder="Нууц үг" />
      <input
        onChange={changePasswordConfirm}
        type="password"
        placeholder="Нууц үгээ давтана уу"
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {props.error && <div style={{ color: "red" }}>{props.error}</div>}
      {props.saving ? (
        <Spinner />
      ) : (
        <Button text="Бүртгүүлэх" btnType="Success" clicked={signup} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    saving: state.signupLoginReducer.saving,
    error: state.signupLoginReducer.error,
    userId: state.signupLoginReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signupUser: (email, password) =>
      dispatch(actions.signupUser(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
