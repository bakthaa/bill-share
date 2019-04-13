import React, { Suspense, lazy } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import st from "./index.css";
import Header from "./component/Header";
// import Manage from "./component/Manage";
// import Home from "./component/Home";
import BillView from "./component/BillView";
import Login from "./component/Login";

const Manage = lazy(() => import("./component/Manage"));
const Home = lazy(() => import("./component/Home"));

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
        <Header auth={this.props.isAuth} />
        <main>
          {this.props.isAuth ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/manage" component={Manage} />
                <Route path="/bill/:name" component={BillView} />
              </Switch>
            </Suspense>
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
