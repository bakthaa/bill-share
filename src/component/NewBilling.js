import React, { useState } from "react";
import { connect } from "react-redux";
import st from "../index.css";
import { onUpdateBcInfo } from "../action";
export const initBillInfo = {
  stDt: "",
  endDt: "",
  amt: 0
};
class NewBilling extends React.Component {
  constructor(props) {
    super(props);
  }

  _onStartDateBlur = e => {
    this.props.onUpdateBcInfo({
      ...this.props.table.info,
      stDt: e.target.value
    });
  };
  _onEndDateBlur = e => {
    this.props.onUpdateBcInfo({
      ...this.props.table.info,
      endDt: e.target.value
    });
  };
  _onAmuntBlur = e => {
    this.props.onUpdateBcInfo({
      ...this.props.table.info,
      amt: e.target.value
    });
  };

  render() {
    return (
      <div className={st.panel}>
        <h4 className={st.title}>Billing</h4>
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <div className={st.row}>
            <div className={`${st.item} ${st.p5}`}>
              <label>Start Date:</label>
              <input
                type="date"
                name="stDate"
                value={this.props.table.info.stDt}
                onChange={this._onStartDateBlur}
              />
            </div>
            <div className={`${st.item} ${st.p5}`}>
              <label>End Date:</label>
              <input
                type="date"
                name="endDate"
                value={this.props.table.info.endDt}
                onChange={this._onEndDateBlur}
              />
            </div>
            <div className={`${st.item} ${st.p5}`}>
              <label>Amount:</label>
              <input
                type="number"
                value={this.props.table.info.amt}
                min="0.00"
                max="1000.00"
                name="total"
                onChange={this._onAmuntBlur}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
// const NewBilling = props => {
//   const { onUpdateBcInfo } = props;
//   const [bc, setBc] = useState(props.table.info);
//
//   const _onStartDateBlur = e => {
//     onUpdateBcInfo({ ...bc, stDt: e.target.value });
//   };
//   const _onEndDateBlur = e => {
//     onUpdateBcInfo({ ...bc, endDt: e.target.value });
//   };
//   const _onAmuntBlur = e => {
//     onUpdateBcInfo({ ...bc, amt: e.target.value });
//   };
//
//
// };

const mapStateToProps = state => {
  return {
    table: state.b_table
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateBcInfo: payload => {
      dispatch(onUpdateBcInfo(payload));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBilling);
// export default NewBilling;
