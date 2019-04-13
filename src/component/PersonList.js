import React from "react";
import { connect } from "react-redux";
import st from "../index.css";
import { setNames, addPerson, removePerson } from "../action";
import { savePersonName, getAllPersons } from "../firebase/firebase";

class PersonList extends React.Component {
  state = { name: "" };
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  _onNameChkClick = e => {
    if (e.target.checked) {
      this.props.onAddPerson(e.target.value);
    } else {
      this.props.removePerson(e.target.value);
    }
  };

  _onAddNameClick = e => {
    console.log(this.state.name);
    if (confirm("Do you want to add " + this.state.name + "?")) {
      const _name = { name: this.state.name, active: true };
      const _that = this;
      savePersonName(_name)
        .then(docRef => {
          // TODO: alert success message
          _that.setState({ ...this.state, name: "" });
          _that._updateNameState();
        })
        .catch(err => {
          // TODO: alert err
        });
    }
  };
  _updateNameState() {
    getAllPersons()
      .then(res => {
        const _names = res.docs.map(_doc => _doc.data().name);
        this.props.setNames(_names);
      })
      .catch(err => console.error("Unable to get Names", err));
    // TODO: display error
  }
  _onAddNameChange = e => {
    this.setState({ ...this.state, name: e.target.value });
  };

  render() {
    return (
      <div className={st.panel}>
        <h4 className={st.title}>
          <span>Persons</span>
          <div>
            <input
              value={this.state.name}
              type="text"
              onChange={this._onAddNameChange}
            />
            <button onClick={this._onAddNameClick}>Add</button>
          </div>
        </h4>

        <div className={st.row}>
          {this.props.names.map(_name => (
            <div className={`${st.item} ${st.w100} ${st.p5}`} key={_name}>
              <input
                id={"pName" + _name}
                type="checkbox"
                name="pName"
                value={_name}
                onClick={this._onNameChkClick}
              />
              <label htmlFor={"pName" + _name}>{_name}</label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    names: state.db.names
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setNames: payload => {
      dispatch(setNames(payload));
    },
    onAddPerson: name => {
      dispatch(addPerson(name));
    },
    removePerson: name => {
      dispatch(removePerson(name));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonList);
