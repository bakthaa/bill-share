import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import st from "./index.css";
import Header from "./component/Header";
import Manage from "./component/Manage";
import Home from "./component/Home";
import BillView from "./component/BillView";
import Login from "./component/Login";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //
  // }

  render() {
    return (
      <React.Fragment>
        <Header auth={this.props.isAuth} email={this.props.email} />
        <main>
          {this.props.isAuth ? (
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/manage" component={Manage} />
              <Route path="/bill/:name" component={BillView} />
            </Switch>
          ) : (
            <Login />
          )}
        </main>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
    email: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
