import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../redux/actions/loginActions";
import Button from "../../components/General/Button";
import Spinner from "../../components/General/Spinner";

import css from "./style.module.css";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
  };

  login = () => {
    this.props.login(this.state.email, this.state.password);
  };

  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  changePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  componentDidUpdate() {
    this.props.userId && this.props.history.push("/orders");
  }

  render() {
    return (
      <div className={css.Login}>
        {this.props.userId && <Redirect to="/orders" />}

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
        {this.props.error && (
          <div style={{ color: "red" }}>{this.props.error}</div>
        )}
        {this.props.logginIn ? (
          <Spinner />
        ) : (
          <Button text="Нэвтрэх" btnType="Success" clicked={this.login} />
        )}
      </div>
    );
  }
}

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
