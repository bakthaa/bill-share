import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route, NavLink } from "react-router-dom";
import {
  getAllPersons,
  getAllExpenseTypes,
  getAllBillings
} from "../firebase/firebase";
import { setNames, setTypes, setBillings } from "../action";
import Butil from "../model/Billings";
import st from "../index.css";
class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const _that = this;
    // TODO: revisit
    getAllPersons()
      .then(res => {
        const _names = res.docs.map(_doc => _doc.data().name);
        _that.props.setNames(_names);
      })
      .catch(err => console.error("Unable to get Names", err));

    getAllExpenseTypes()
      .then(res => {
        _that.props.setTypes(res.docs.map(_doc => _doc.data().type));
      })
      .catch(err => console.error("Unable to get Types", err));

    getAllBillings()
      .then(querySnapshot => {
        // console.log(querySnapshot);
        const _bills = querySnapshot.docs.map(doc => {
          return doc.data();
        });
        // console.log(_bills);
        // console.log(`${doc.id} => ${doc.data()}`);
        const bb = Butil.billCycleToPersons(_bills);

        this.props.setBillings(bb);
      })
      .catch(function(error) {
        console.error("Unable to get Billings", error);
      });
  }

  onPersonClick(name) {
    this.props.history.push("bill/" + name);
  }
  render() {
    return (
      <div>
        <h3 className={st.welcome}>
          Welcome,
          <span> {this.props.email ? this.props.email : null}</span>
        </h3>
        <div className={st.cards + " " + st.NavLink}>
          {this.props.db.bill ? (
            Object.keys(this.props.db.bill).map(name => (
              <NavLink to={"/bill/" + name} key={name}>
                <div>
                  <h2>{name}</h2>
                  <p>Total: {this.props.db.bill[name].gTotal}</p>
                </div>
              </NavLink>
            ))
          ) : (
            <p>No Billings found at this time!</p>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    db: state.db,
    email: state.auth.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setNames: payload => {
      dispatch(setNames(payload));
    },
    setTypes: payload => {
      dispatch(setTypes(payload));
    },
    setBillings: data => {
      dispatch(setBillings(data));
    }
  };
};
// export default Home;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
