import React from "react";
import { Link, Route, NavLink } from "react-router-dom";
import st from "../index.css";
// className={st.selected}
const Header = props => {
  return (
    <header>
      <div className={st.container}>
        <h1>
          <Link to="/">VVS</Link>
        </h1>
        {props.auth ? (
          <nav>
            <Link to="/">Home</Link>
            <Link to="/manage">Manage</Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
};
export default Header;
