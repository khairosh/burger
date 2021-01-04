import React, { useEffect } from "react";

import { connect } from "react-redux";

import axios from "../../axios-orders";
import Spinner from "../../components/General/Spinner";
import Order from "../../components/Order";

import * as actions from "../../redux/actions/orderActions";

import css from "./stye.module.css";

const OrderPage = (props) => {
  useEffect(() => {
    props.loadOrders(props.userId);
  }, []);

  return (
    <div>
      {props.loading ? (
        <Spinner />
      ) : (
        props.orders.map((order) => <Order key={order[0]} order={order[1]} />)
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.orderReducer.loading,
    orders: state.orderReducer.orders,
    userId: state.signupLoginReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadOrders: (userId) => dispatch(actions.loadOrders(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
