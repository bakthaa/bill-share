import React from "react";
import { connect } from "react-redux";
import { doLogin } from "../firebase/firebase";
import { setUser } from "../action";
import st from "../index.css";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  onSubmit = event => {
    const { email, password } = this.state;

    try {
      doLogin(email, password)
        .then(result => {
          // console.log(result.user);
          this.props.setUser(result.user);
          // this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
          // console.log(error);
          this.setState({ error });
        });
    } catch (e) {
      console.log(e);
    } finally {
    }

    event.preventDefault();
  };

  componentWillUnmount() {
    this.setState({ ...INITIAL_STATE });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";
    return (
      <form onSubmit={this.onSubmit} className={st.cards}>
        <div className={st.login}>
          <h2>Login</h2>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          {error && <p className={st.err}>{error.message}</p>}
          <button disabled={isInvalid} type="submit">
            Log In
          </button>
        </div>
      </form>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setUser: user => {
      dispatch(setUser(user));
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Login);
