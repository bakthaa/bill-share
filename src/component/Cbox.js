import React from "react";
import { connect } from "react-redux";
import st from "../index.css";
import { onCellValChange } from "../action";
// <input type="number" min="0.00" max="1000.00" step="0.01" />

const Cbox = props => {
  const { data, onCellValueChange } = props;
  const _onValueChange = e => {
    const _num = Number(e.target.value);
    const _val = {
      id: e.target.dataset.id,
      value: isNaN(_num) ? 0.0 : _num.toFixed(2)
    };
    onCellValueChange(_val);
  };
  return data.disable ? (
    <strong>{data.value}</strong>
  ) : (
    <input
      type="number"
      min="0.00"
      max="1000.00"
      step="1.00"
      defaultValue={data.value}
      data-id={data.id}
      onBlur={_onValueChange}
    />
  );
};
const mapDispatchToProps = dispatch => {
  return {
    onCellValueChange: payload => {
      dispatch(onCellValChange(payload));
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Cbox);
