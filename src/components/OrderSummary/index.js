import React from "react";

import { connect } from "react-redux";

import Button from "../General/Button";

import css from "./style.module.css";

const OrderSummary = (props) => {
  return (
    <div>
      <h3>Таны захиалга</h3>
      <p>Таны сонгосон орцууд:</p>
      <ul>
        {Object.entries(props.ingredients).map((entry) => (
          <li key={entry[0]}>
            {props.ingredientNames[entry[0]]} : {entry[1]}
          </li>
        ))}
      </ul>
      <p>
        <strong>Захиалгын дүн: {props.totalPrice}₮</strong>
      </p>
      <Button clicked={props.onCancel} btnType="Danger" text="Татгалзах" />
      <Button
        clicked={props.onContinue}
        btnType="Success"
        text="Үргэлжлүүлэх"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerReducer.ingredients,
    ingredientNames: state.burgerReducer.ingredientNames,
    totalPrice: state.burgerReducer.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
