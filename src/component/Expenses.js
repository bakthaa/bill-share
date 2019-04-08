import React from "react";
import { connect } from "react-redux";
import st from "../index.css";
import ExpensesItem from "./ExpensesItem";
import ExpensesItemTotal from "./ExpensesItemTotal";
import BillingOperation from "./BillingOperation";
// <ExpensesItemTotal title={state.title} />
const Expenses = ({ table }) => {
  // console.log(table.hTotal);
  return (
    <div className={st.panel}>
      <h4 className={st.title}>Expenses:</h4>
      {table.items.map((_item, i) => (
        <ExpensesItem item={_item} total={table.hTotal[i]} key={"item-" + i} />
      ))}
      <ExpensesItemTotal />
      <hr />
      <BillingOperation />
    </div>
  );
};
const mapStateToProps = state => {
  return {
    table: state.b_table
  };
};
export default connect(mapStateToProps)(Expenses);
