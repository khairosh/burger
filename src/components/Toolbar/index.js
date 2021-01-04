import React from "react";
import HamburgerMenu from "../HamburgerMenu";
import Logo from "../Logo";
import Menu from "../Menu";

import css from "./style.module.css";

const Toolbar = (props) => (
  <header className={css.Toolbar}>
    <HamburgerMenu toggleSidebar={props.toggleSidebar} />
    <Logo />
    {/* style={css} */}
    <nav className={css.HideOnMobile}>
      <Menu />
    </nav>
  </header>
);

// const css = {
//   color: "gray",
// };

export default Toolbar;
