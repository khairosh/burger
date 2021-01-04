import React, { Component } from "react";

import { connect } from "react-redux";

import Burger from "../../components/Burger";
import Button from "../../components/General/Button";

import { Route } from "react-router-dom";
import Contact from "../../components/Contact";

import css from "./style.module.css";

class ShippingPage extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  // render-н өмнө ажиллана
  componentWillMount() {}

  // render()-н дараа ажиллана
  componentDidMount() {
    console.log("DidMount() : After render");
  }

  goBack = () => {
    this.props.history.goBack();
  };

  showContactData = () => {
    this.props.history.replace("/ship/contact");
  };

  render() {
    return (
      <div className={css.ShippingPage}>
        <p style={{ fontSize: "20px" }}>
          <strong>Таны захиалга амттай байх болно гэж найдаж байна</strong>
        </p>
        <p style={{ fontSize: "20px" }}>
          Дүн: <strong>{this.props.totalPrice}₮</strong>
        </p>
        <Burger />
        <Button
          text="ЗАХИАЛГЫГ ЦУЦЛАХ"
          clicked={this.goBack}
          btnType="Danger"
        />
        <Button
          text="ХҮРГЭЛТИЙН МЭДЭЭЛЭЛ ОРУУЛАХ"
          clicked={this.showContactData}
          btnType="Success"
        />

        <Route path="/ship/contact" render={() => <Contact />} />
        {/* <Route path="/ship/contact">
          <Contact
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
          />
        </Route> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalPrice: state.burgerReducer.totalPrice,
  };
};

export default connect(mapStateToProps)(ShippingPage);
