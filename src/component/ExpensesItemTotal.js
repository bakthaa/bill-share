import React from "react";
import st from "../index.css";
import { connect } from "react-redux";

const ExpensesItemTotal = ({ table }) => {
  const cell = `${st.item} ${st.p5}`;
  const _row = table.total.map((_cell, i) => (
    <div className={cell + " " + (i === 0 ? st.w150 : st.w75)} key={_cell.id}>
      <strong>{_cell.value}</strong>
    </div>
  ));
  return <div className={st.row}>{_row}</div>;
};
const mapStateToProps = state => {
  return {
    table: state.b_table
  };
};
export default connect(mapStateToProps)(ExpensesItemTotal);
