import React, { Component } from "react";

import { connect } from "react-redux";

import Button from "../General/Button";
import Spinner from "../../components/General/Spinner";

import { withRouter } from "react-router-dom";

import css from "./style.module.css";

import * as actions from "../../redux/actions/orderActions";

class Contact extends Component {
  state = {
    custName: null,
    city: null,
    stree: null,
  };

  changedName = (e) => {
    this.setState({ custName: e.target.value });
  };

  changedCity = (e) => {
    this.setState({ city: e.target.value });
  };

  changedStreet = (e) => {
    this.setState({ street: e.target.value });
  };

  saveOrder = () => {
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      address: {
        custName: this.state.custName,
        city: this.state.city,
        street: this.state.street,
      },
      userId: this.props.userId,
    };

    this.props.saveOrderAction(order);

    // this.setState({ loading: true });
    // axios
    //   .post("orders.json", order)
    //   .then((response) => {
    //     alert("Success");
    //     this.props.history.replace("/");
    //   })
    //   .finally(() => {
    //     this.setState({ loading: false });
    //   });
  };

  componentDidUpdate() {
    this.props.newOrderStatus.finished && this.props.history.replace("/orders");
  }

  render() {
    return this.props.newOrderStatus.saving ? (
      <Spinner />
    ) : (
      <div>
        <div>
          {this.props.newOrderStatus.error &&
            "Захиалгыг хадгалах явцад алдаа гарлаа: " +
              this.props.newOrderStatus.error}
        </div>
        <div className={css.Contact}>
          <input
            onChange={this.changedName}
            type="text"
            name="custName"
            placeholder="Таны нэр"
          />
          <input
            onChange={this.changedCity}
            type="text"
            name="city"
            placeholder="Хот"
          />
          <input
            onChange={this.changedStreet}
            type="text"
            name="street"
            placeholder="Гэрийн хаяг"
          />
          <Button text="ИЛГЭЭХ" btnType="Success" clicked={this.saveOrder} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalPrice: state.burgerReducer.totalPrice,
    ingredients: state.burgerReducer.ingredients,
    newOrderStatus: state.orderReducer.newOrder,
    userId: state.signupLoginReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveOrderAction: (newOrder) => dispatch(actions.saveOrder(newOrder)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Contact));
