import React from "react";
import { connect } from "react-redux";
import { setBillings } from "../action";
import st from "../index.css";

class BillView extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
  }

  render() {
    const { params } = this.props.match; //match.params.name
    const pDetail = this.props.db.bill[params.name];
    return pDetail ? (
      <div>
        <div className={st.secTitle}>
          <h3>{params.name}</h3>
          <strong>Total: {pDetail.gTotal}</strong>
        </div>
        <div className={st.sec2}>
          {pDetail.bcs.map((_bc, i) => (
            <div className={st.sec2sub} key={"bc-" + i}>
              <div className={st.secTitle}>
                <h4>{_bc.period}</h4>
                <strong>Sub Total: {_bc.total}</strong>
              </div>
              {_bc.items.map((_item, i) => (
                <ul key={"item-" + i}>
                  <li>{_item.type}</li>
                  <li>{_item.val}</li>
                </ul>
              ))}
            </div>
          ))}
        </div>
      </div> //root end
    ) : (
      <div>No Detail found!</div>
    );
  }
}
const mapStateToProps = state => {
  return {
    db: state.db
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setBillings: data => {
      dispatch(setBillings(data));
    }
  };
};
// export default Home;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillView);
// export default BillView;
