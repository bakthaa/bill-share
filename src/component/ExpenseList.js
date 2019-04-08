import React from "react";
import { connect } from "react-redux";
import st from "../index.css";
import { setTypes, addExpense, removeExpense } from "../action";
import { saveExpenseType, getAllExpenseTypes } from "../firebase/firebase";

class ExpenseList extends React.Component {
  state = { type: "" };
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  _onNameChkClick = e => {
    if (e.target.checked) {
      this.props.onAddExpense(e.target.value);
    } else {
      this.props.onRemoveExpense(e.target.value);
    }
  };

  _onAddTypeClick = e => {
    if (confirm("Do you want to add " + this.state.type + "?")) {
      const _type = { type: this.state.type, active: true };
      const _that = this;
      saveExpenseType(_type)
        .then(() => {
          // TODO: alert success message
          _that.setState({ ...this.state, type: "" });
          _that._updateTypeState();
        })
        .catch(err => {
          // TODO: alert err
        });
    }
  };

  _updateTypeState() {
    getAllExpenseTypes()
      .then(res => {
        this.props.setTypes(res.docs.map(_doc => _doc.data().type));
      })
      .catch(err => console.error("Unable to get Names", err));
  }

  _onAddTypeChange = e => {
    this.setState({ ...this.state, type: e.target.value });
  };
  //checked={true}
  render() {
    return (
      <div className={st.panel}>
        <h4 className={st.title}>
          <span>Type</span>
          <div>
            <input
              value={this.state.type}
              type="text"
              onChange={this._onAddTypeChange}
            />
            <button onClick={this._onAddTypeClick}>Add</button>
          </div>
        </h4>

        <div className={st.row}>
          {this.props.types.map(_type => (
            <div className={`${st.item} ${st.w100} ${st.p5}`} key={_type}>
              <input
                type="checkbox"
                name="pName"
                value={_type}
                onChange={this._onNameChkClick}
              />
              <label>{_type}</label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    types: state.db.types
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setTypes: payload => {
      dispatch(setTypes(payload));
    },
    onAddExpense: type => {
      dispatch(addExpense(type));
    },
    onRemoveExpense: type => {
      dispatch(removeExpense(type));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseList);
