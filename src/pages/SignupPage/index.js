import React, { useState, useEffect } from "react";

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

  // Талбарын утга өөрчлөгдөхөд validation хийхэд useEffect ашиглаж болно
  useEffect(() => {
    console.log("Email changing...");
    // setPassword(email);
  }, [email]);

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
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Имэйл хаяг"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Нууц үг"
      />
      <input
        onChange={(e) => setPasswordConfirm(e.target.value)}
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
