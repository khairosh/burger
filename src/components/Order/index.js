import React from "react";

import css from "./style.module.css";

const Order = (props) => {
  console.log(props.order);
  return (
    <div className={css.Order}>
      <p>Захиалагч: {props.order.address.custName}</p>
      <p>
        Хаяг: {props.order.address.street} | {props.order.address.city}
      </p>
      <p>
        Үнийн дүн: <strong>{props.order.totalPrice}₮</strong>
      </p>
      <p>Орц: </p>
      <div style={{ display: "flex", flexFlow: "row" }}>
        {Object.entries(props.order.ingredients).map((el) => (
          <p key={el[0]} style={{ margin: "5px" }}>
            {el[0]} : <strong>{el[1]}</strong>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Order;
