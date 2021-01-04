import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import css from "./style.module.css";

import Toolbar from "../../components/Toolbar";
import BurgerPage from "../BurgerPage";
import Sidebar from "../../components/Sidebar";
import OrderPage from "../OrderPage";

import { Route, Switch } from "react-router-dom";
import ShippingPage from "../ShippingPage";
import Burger from "../../components/Burger";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";
import Logout from "../../components/Logout";

import * as actions from "../../redux/actions/loginActions";

class App extends Component {
  state = {
    showSidebar: false,
    showSidebar: false,
  };

  toggleSidebar = () => {
    this.setState((prevState) => {
      return { showSidebar: !prevState.showSidebar };
    });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      const userId = localStorage.getItem("userId");
      const expireDate = new Date(localStorage.getItem("expireDate"));
      const refreshToken = localStorage.getItem("refreshToken");

      if (expireDate > new Date()) {
        // Хугацаа нь дуусаагүй
        this.props.autoLogin(userId, token);
        const ms = expireDate.getTime() - new Date().getTime();
        this.props.autoLogout(ms);
      } else {
        // Хугацаа нь дууссан
        this.props.logout();
      }
    }
  }

  render() {
    return (
      <div>
        <Toolbar toggleSidebar={this.toggleSidebar} />
        <Sidebar
          showSidebar={this.state.showSidebar}
          toggleSidebar={this.toggleSidebar}
        />
        <main className={css.Content}>
          {this.props.userId ? (
            <Switch>
              <Route path="/orders" component={OrderPage} />
              <Route path="/ship" component={ShippingPage} />
              <Route path="/logout" component={Logout} />
              <Route path="/" component={BurgerPage} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignupPage} />
              <Redirect to="/login" />
            </Switch>
          )}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.signupLoginReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: (userId, token) =>
      dispatch(actions.loginUserSuccess(userId, token)),
    logout: () => dispatch(actions.logout()),
    autoLogout: (ms) => dispatch(actions.logout(ms)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
