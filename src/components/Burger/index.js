import React from "react";

import { connect } from "react-redux";

import css from "./style.module.css";

import BurgerIngredient from "../BurgerIngredient";

import { withRouter } from "react-router-dom"; // High Order component

const Burger = (props) => {
  console.log("== Burger ==");
  console.log(props);

  const items = Object.entries(props.ingredients);
  let content = [];
  items.map((item) => {
    for (let i = 0; i < item[1]; i++) {
      content.push(<BurgerIngredient key={`${item[0]}${i}`} type={item[0]} />);
    }
  });

  if (content.length === 0) {
    content = <p>Хачиртай талхныхаа орцыг сонгоно уу...</p>;
  }

  console.log(items);

  return (
    <div className={css.Burger}>
      <BurgerIngredient type="bread-top" />
      {content}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerReducer.ingredients,
  };
};

export default connect(mapStateToProps)(withRouter(Burger));
