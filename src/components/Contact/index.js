import React, { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";

import Button from "../General/Button";
import Spinner from "../../components/General/Spinner";

import { withRouter } from "react-router-dom";

import css from "./style.module.css";

import * as actions from "../../redux/actions/orderActions";

const Contact = (props) => {
  const [custName, setCustName] = useState(null);
  const [city, setCity] = useState(null);
  const [street, setStreet] = useState(null);

  const titleRef = useRef();

  // useEffect(() => {
  //   return () => {
  //     props.clearOrder();
  //   };
  // }, []);

  useEffect(() => {
    props.newOrderStatus.finished && props.history.replace("/orders");

    return () => {
      props.newOrderStatus.finished && props.clearOrder();
    };
  }, [props.newOrderStatus.finished]);

  // const componentDidUpdate = () =>
  //   props.newOrderStatus.finished && props.history.replace("/orders");
  // }

  const changedName = (e) => {
    // Өнгө анивчих
    if (titleRef.current.style.color === "red")
      titleRef.current.style.color = "green";
    else titleRef.current.style.color = "red";

    setCustName(e.target.value);
  };

  const changedCity = (e) => {
    setCity(e.target.value);
  };

  const changedStreet = (e) => {
    setStreet(e.target.value);
  };

  const saveOrder = () => {
    const order = {
      ingredients: props.ingredients,
      totalPrice: props.totalPrice,
      address: {
        custName,
        city,
        street,
      },
      userId: props.userId,
    };

    props.saveOrderAction(order);

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

  return (
    <div>
      <div>
        {props.newOrderStatus.error &&
          "Захиалгыг хадгалах явцад алдаа гарлаа: " +
            props.newOrderStatus.error}
      </div>
      <div className={css.Contact}>
        <div ref={titleRef}>
          <h3>Үнэн зөв оруулна уу</h3>
        </div>
        <input
          onChange={changedName}
          type="text"
          name="custName"
          placeholder="Таны нэр"
        />
        <input
          onChange={changedCity}
          type="text"
          name="city"
          placeholder="Хот"
        />
        <input
          onChange={changedStreet}
          type="text"
          name="street"
          placeholder="Гэрийн хаяг"
        />
        {props.newOrderStatus.saving ? (
          <Spinner />
        ) : (
          <Button text="ИЛГЭЭХ" btnType="Success" clicked={saveOrder} />
        )}
      </div>
    </div>
  );
};

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
    clearOrder: () => dispatch(actions.clearOrder()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Contact));
