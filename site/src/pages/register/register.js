import React from "react";
import { userRegister } from "../../utils";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      pass1: "",
      pass2: "",
      classPass: "input",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    var obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }

  async handleSubmit() {
    this.setState({ loading: true });
    if (this.state.pass1 !== this.state.pass2) {
      this.setState({ classPass: this.state.classPass + " is-danger" });
      return null;
    }
    let msg = await userRegister(this.state.email, this.state.pass1);
    if (msg.message === "Success") alert("User registered successfuly");
    this.setState({ loading: false });
  }

  render() {
    return (
      <section className="section">
        <div
          className="container"
          style={{ width: 400 + "px", marginTop: 100 + "px" }}
        >
          <div className="content">
            <h1 className="is-large">User registration</h1>
          </div>

          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                id="email"
                className="input"
                type="email"
                placeholder="Email"
                onChange={this.handleChange}
                value={this.state.email}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              {/* <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span> */}
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                id="pass1"
                className={this.state.classPass}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.pass1}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                id="pass2"
                className={this.state.classPass}
                type="password"
                placeholder="Repeat password"
                onChange={this.handleChange}
                value={this.state.pass2}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button
                className={
                  this.state.loading
                    ? "button is-success is-loading"
                    : "button is-success"
                }
                onClick={this.handleSubmit}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export default Register;
