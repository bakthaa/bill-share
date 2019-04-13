import React, { Component } from "react";
// import { Link, Route } from "react-router-dom";

import NewBilling from "./NewBilling";
import Expenses from "./Expenses";
import PersonList from "./PersonList";
import ExpenseList from "./ExpenseList";
import st from "../index.css";

class Manage extends Component {
  render() {
    return (
      <div>
        <p className={st.err}>
          <b>Admin use only!!!</b>
        </p>
        <NewBilling />
        <PersonList />
        <ExpenseList />
        <Expenses />
      </div>
    );
  }
}
export default Manage;
