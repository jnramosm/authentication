import React from "react";
import { userLogin } from "../../utils";
import auth from "../../auth/auth";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      pass: "",
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

    let res = await userLogin(this.state.email, this.state.pass);
    // console.log(res);
    if (res.message === "Success") {
      auth.setAuthentication(true);
      auth.setAccessToken(res.accessToken);
      auth.setEmail(this.state.email);
      this.props.history.replace("/");
    }
    // this.setState({ loading: false });
  }

  render() {
    return (
      <section className="section">
        <div
          className="container"
          style={{ width: 400 + "px", marginTop: 100 + "px" }}
        >
          <div className="content">
            <h1 className="is-large">Login</h1>
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
                id="pass"
                className={this.state.classPass}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.pass}
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
