import React from "react";

import css from "./style.module.css";

const HamburgerMenu = (props) => (
  <div className={css.HamburgerMenu} onClick={props.toggleSidebar}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default HamburgerMenu;
