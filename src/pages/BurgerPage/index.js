import React, { Component } from "react";

import "./style.css";

import Burger from "../../components/Burger";
import BuildControls from "../../components/BuildControls";
import Modal from "../../components/General/Modal";
import OrderSummary from "../../components/OrderSummary";
import Spinner from "../../components/General/Spinner";

class BurgerPage extends Component {
  state = {
    confirmOrder: false,
    lastCustName: "N/A",
    loading: false,
  };

  increaseIngredient = (type) => {
    // console.log(" >>> " + type);
    // const newIngredients = { ...this.props.burgeriinOrts };
    // newIngredients[type]++;
    // const newPrice = this.props.niitUne + INGREDIENT_PRICES[type];
    // this.setState({
    //   ingredients: newIngredients,
    //   totalPrice: newPrice,
    //   purchasing: true,
    // });
  };

  decreaseIngredient = (type) => {
    // const newIngredients = { ...this.props.burgeriinOrts };
    // let count = newIngredients[type];
    // if (count > 0) {
    //   newIngredients[type]--;
    //   const newPrice = this.props.niitUne - INGREDIENT_PRICES[type];
    //   this.setState({
    //     ingredients: newIngredients,
    //     totalPrice: newPrice,
    //     purchasing: newPrice > 500,
    //   });
    // }
  };

  continueOrder = () => {
    this.props.history.push({
      pathname: "/ship",
    });

    this.closeConfirmModal();
  };

  showConfirmModal = () => {
    this.setState({ confirmOrder: true });
  };

  closeConfirmModal = () => {
    this.setState({ confirmOrder: false });
  };

  // render хийгдсэний дараа дуудагдана
  componentDidMount = () => {};

  render() {
    console.log(">> Redux", this.props);
    return (
      <div>
        <Modal
          show={this.state.confirmOrder}
          closeConfirmModal={this.closeConfirmModal}
        >
          <OrderSummary
            onCancel={this.closeConfirmModal}
            onContinue={this.continueOrder}
          />
        </Modal>

        {this.state.loading && <Spinner />}

        <Burger />
        <BuildControls showConfirmModal={this.showConfirmModal} />
      </div>
    );
  }
}

export default BurgerPage;
