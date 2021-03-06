import React from "react";

import { connect } from "react-redux";

import css from "./style.module.css";

import BuildControl from "../BuildControl";

const BuildControls = (props) => {
  let disabledIngredients = { ...props.ingredients };

  for (let key in disabledIngredients) {
    disabledIngredients[key] = disabledIngredients[key] <= 0;
  }

  return (
    <div className={css.BuildControls}>
      <p>
        Бургерийн үнэ: <strong> {props.totalPrice} </strong>
      </p>

      {Object.keys(props.ingredientNames).map((key) => (
        <BuildControl
          disabled={disabledIngredients}
          key={key}
          type={key}
          text={props.ingredientNames[key]}
        />
      ))}

      <button
        disabled={!props.purchasing}
        className={css.OrderButton}
        onClick={props.showConfirmModal}
      >
        ЗАХИАЛАХ
      </button>
      <br />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerReducer.ingredients,
    totalPrice: state.burgerReducer.totalPrice,
    ingredientNames: state.burgerReducer.ingredientNames,
    purchasing: state.burgerReducer.purchasing,
  };
};

export default connect(mapStateToProps)(BuildControls);
