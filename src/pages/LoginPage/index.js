import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../redux/actions/loginActions";
import Button from "../../components/General/Button";
import Spinner from "../../components/General/Spinner";

import css from "./style.module.css";

const LoginPage = (props) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const login = () => {
    props.login(form.email, form.password);
  };

  const changeEmail = (e) => {
    const newEmail = e.target.value;
    setForm((prevForm) => ({
      password: prevForm.password,
      email: newEmail,
    }));
  };

  const changePassword = (e) => {
    const newPassword = e.target.value;
    setForm((prevForm) => {
      return {
        email: prevForm.email,
        password: newPassword,
      };
    });
  };

  return (
    <div className={css.Login}>
      {props.userId && <Redirect to="/orders" />}

      <input onChange={changeEmail} type="text" placeholder="Имэйл хаяг" />
      <input onChange={changePassword} type="password" placeholder="Нууц үг" />
      {props.error && <div style={{ color: "red" }}>{props.error}</div>}
      {props.logginIn ? (
        <Spinner />
      ) : (
        <Button text="Нэвтрэх" btnType="Success" clicked={login} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    logginIn: state.signupLoginReducer.logginIn,
    error: state.signupLoginReducer.error,
    userId: state.signupLoginReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(actions.loginUser(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
