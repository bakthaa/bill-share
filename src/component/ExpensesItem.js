import React from "react";
import st from "../index.css";
import Cbox from "./Cbox";

const ExpensesItem = props => {
  const cell = `${st.item} ${st.p5}`;
  return (
    <div className={st.row}>
      {props.item.map((_cell, i) => (
        <div className={`${cell} ${i === 0 ? st.w150 : st.w75}`} key={_cell.id}>
          <Cbox data={_cell} key={_cell.id} />
        </div>
      ))}
      {props.total ? (
        <div className={`${cell} ${st.w75}`}>
          <Cbox data={props.total} />
        </div>
      ) : null}
    </div>
  );
};
export default ExpensesItem;
