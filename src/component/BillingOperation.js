import React, { useState } from "react";
import { connect } from "react-redux";
import st from "../index.css";
import { addExpense, clearExpense } from "../action";
import Butil from "../model/Billings";
import { saveBilling } from "../firebase/firebase";
// import { dbBilling } from "../firebase/firebase";

const BillingOperation = props => {
  const [errMsg, setErrMsg] = useState("");
  const _item = `${st.item} ${st.p5}`;
  const stAlignC = { textAlign: "center" };
  // const _onAddNameClick = e => {
  //   e.preventDefault();
  //   props.onAddPerson();
  // };
  const _onAddExpenseClick = e => {
    e.preventDefault();
    props.onAddExpense();
  };
  const _onFinalizeClick = e => {
    e.preventDefault();
    setErrMsg("");
    const _isValid = Butil.validateBtable(props.table);
    if (!_isValid.valid) {
      setErrMsg(_isValid.errMsg);
    } else {
      if (confirm("Are you sure?")) {
        const _bc = Butil.toBillingCycle(props.table);
        const bc = Butil.toValue(_bc);
        saveBilling(bc)
          .then(function(docRef) {
            setErrMsg("Billing saved successfully!");
            console.log("Document written with ID: ", docRef.id);
            console.log(props.table);
            props.clearBtable();
          })
          .catch(function(error) {
            setErrMsg("Unable to saved Billing");
            console.error("Error adding document: ", error);
          });
      }
    }
  };
  return (
    <div>
      {errMsg ? (
        <p className={st.err}>
          <b>{errMsg}</b>
        </p>
      ) : null}
      <div className={st.row}>
        <div className={_item} style={stAlignC}>
          <button onClick={_onFinalizeClick}>Finalize</button>
        </div>
      </div>
    </div>
  );
};
// export default BillingOperation;
const mapDispatchToProps = dispatch => {
  return {
    onAddExpense: () => {
      dispatch(addExpense());
    },
    clearBtable: () => {
      dispatch(clearExpense());
    }
  };
};
const mapStateToProps = state => {
  return {
    table: state.b_table
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingOperation);
