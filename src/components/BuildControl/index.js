import React from "react";
import { connect } from "react-redux";

import * as actions from "../../redux/actions/burgerActions";

import css from "./style.module.css";

const BuildControl = (props) => (
  <div className={css.BuildControl}>
    <div className={css.Label}>{props.text}</div>
    <button
      disabled={props.disabled[props.type]}
      onClick={() => props.decreaseIngredient(props.type)}
      className={css.Less}
    >
      Хасах
    </button>
    <button
      onClick={() => props.increaseIngredient(props.type)}
      className={css.More}
    >
      Нэмэх
    </button>
  </div>
);

const mapDispatchToProps = (dispatch) => {
  return {
    increaseIngredient: (ortsNer) => dispatch(actions.addIngredient(ortsNer)),
    decreaseIngredient: (ortsNer) =>
      dispatch(actions.removeIngredient(ortsNer)),
  };
};

export default connect(null, mapDispatchToProps)(BuildControl);
