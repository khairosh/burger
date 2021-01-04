import React from "react";

import { connect } from "react-redux";

import Burger from "../../components/Burger";
import Button from "../../components/General/Button";

import { Route } from "react-router-dom";
import Contact from "../../components/Contact";

import css from "./style.module.css";

const ShippingPage = (props) => {
  const cancelOrder = () => {
    props.history.goBack();
  };

  const showContactData = () => {
    props.history.replace("/ship/contact");
  };

  return (
    <div className={css.ShippingPage}>
      <p style={{ fontSize: "20px" }}>
        <strong>Таны захиалга амттай байх болно гэж найдаж байна</strong>
      </p>
      <p style={{ fontSize: "20px" }}>
        Дүн: <strong>{props.totalPrice}₮</strong>
      </p>
      <Burger />
      <Button text="ЗАХИАЛГЫГ ЦУЦЛАХ" clicked={cancelOrder} btnType="Danger" />
      <Button
        text="ХҮРГЭЛТИЙН МЭДЭЭЛЭЛ ОРУУЛАХ"
        clicked={showContactData}
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
};

const mapStateToProps = (state) => {
  return {
    totalPrice: state.burgerReducer.totalPrice,
  };
};

export default connect(mapStateToProps)(ShippingPage);
