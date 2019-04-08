import React, { Component } from "react";
// import { Link, Route } from "react-router-dom";

import NewBilling from "./NewBilling";
import Expenses from "./Expenses";
import PersonList from "./PersonList";
import ExpenseList from "./ExpenseList";

class Manage extends Component {
  render() {
    return (
      <div>
        <NewBilling />
        <PersonList />
        <ExpenseList />
        <Expenses />
      </div>
    );
  }
}
export default Manage;
