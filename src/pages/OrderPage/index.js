import React, { Component } from "react";

import { connect } from "react-redux";

import axios from "../../axios-orders";
import Spinner from "../../components/General/Spinner";
import Order from "../../components/Order";

import * as actions from "../../redux/actions/orderActions";

import css from "./stye.module.css";

class OrderPage extends Component {
  componentDidMount() {
    this.props.loadOrders(this.props.userId);

    // this.setState({ loading: true });
    // axios
    //   .get("orders.json")
    //   .then((response) => {
    //     this.setState({ orders: Object.entries(response.data).reverse() });
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() => {
    //     this.setState({ loading: false });
    //   });
  }

  render() {
    console.log(this.props.orders);

    return (
      <div>
        {this.props.loading ? (
          <Spinner />
        ) : (
          this.props.orders.map((order) => (
            <Order key={order[0]} order={order[1]} />
          ))
        )}
      </div>
    );
  }
}

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
