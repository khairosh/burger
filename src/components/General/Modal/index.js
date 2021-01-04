import React from "react";
import Shadow from "../Shadow";

import css from "./style.module.css";

const Modal = (props) => (
  <div>
    <Shadow show={props.show} onClick={props.closeConfirmModal} />
    <div
      className={css.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
    >
      {props.children}
    </div>
  </div>
);

export default Modal;
