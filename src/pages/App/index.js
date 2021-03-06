import React, { useState, useEffect, Suspense } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import css from "./style.module.css";

import Toolbar from "../../components/Toolbar";

import Sidebar from "../../components/Sidebar";

import { Route, Switch } from "react-router-dom";
import ShippingPage from "../ShippingPage";
import Burger from "../../components/Burger";
import LoginPage from "../LoginPage";

import Logout from "../../components/Logout";

import * as actions from "../../redux/actions/loginActions";
import Spinner from "../../components/General/Spinner";

// Lazy loading
// import BurgerPage from "../BurgerPage";
// import SignupPage from "../SignupPage";
// import OrderPage from "../OrderPage";

const BurgerPage = React.lazy(() => {
  return import("../BurgerPage");
});

const OrderPage = React.lazy(() => {
  return import("../OrderPage");
});

const SignupPage = React.lazy(() => {
  return import("../SignupPage");
});

const App = (props) => {
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userId = localStorage.getItem("userId");
      const expireDate = new Date(localStorage.getItem("expireDate"));
      const refreshToken = localStorage.getItem("refreshToken");

      if (expireDate > new Date()) {
        // Хугацаа нь дуусаагүй
        props.autoLogin(userId, token);
        const ms = expireDate.getTime() - new Date().getTime();
        props.autoLogout(ms);
      } else {
        // Хугацаа нь дууссан
        props.logout();
      }
    }
  }, []);

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  return (
    <div>
      <Toolbar toggleSidebar={toggleSidebar} />
      <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <main className={css.Content}>
        <Suspense fallback={<div>Түр хүлээнэ үү...</div>}>
          {props.userId ? (
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
        </Suspense>
      </main>
    </div>
  );
};

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
    autoLogout: (ms) => dispatch(actions.autoLogout(ms)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
