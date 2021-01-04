import React, { Component } from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "../../components/General/Button";

import css from "./style.module.css";

import * as actions from "../../redux/actions/signupActions";
import Spinner from "../../components/General/Spinner";

class SignupPage extends Component {
  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    // Password not match
    error: "",
  };

  signup = () => {
    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({ error: "Нууц үгээ зөв давтана уу!" });
      // return;
    } else {
      this.setState({ error: "" });
      this.props.signupUser(this.state.email, this.state.password);
    }
  };

  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  changePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  changePasswordConfirm = (e) => {
    this.setState({ passwordConfirm: e.target.value });
  };

  componentDidUpdate() {
    // this.props.userId && this.props.history.push("/orders");
  }

  render() {
    return (
      <div className={css.Signup}>
        {this.props.userId && <Redirect to="/orders" />}
        <h3>Мэдээллээ оруулна уу</h3>
        <input
          onChange={this.changeEmail}
          type="text"
          placeholder="Имэйл хаяг"
        />
        <input
          onChange={this.changePassword}
          type="password"
          placeholder="Нууц үг"
        />
        <input
          onChange={this.changePasswordConfirm}
          type="password"
          placeholder="Нууц үгээ давтана уу"
        />
        {this.state.error && (
          <div style={{ color: "red" }}>{this.state.error}</div>
        )}
        {this.props.error && (
          <div style={{ color: "red" }}>{this.props.error}</div>
        )}
        {this.props.saving ? (
          <Spinner />
        ) : (
          <Button text="Бүртгүүлэх" btnType="Success" clicked={this.signup} />
        )}
      </div>
    );
  }
}

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
