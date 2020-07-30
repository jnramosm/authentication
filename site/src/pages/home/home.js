import React from "react";
import { getUsername, setUsername } from "../../utils";
import auth from "../../auth/auth";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      username_def: "",
      loading: false,
      button: "button is-primary",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    let r = await getUsername(auth.getEmail(), auth.getAccessToken());
    if (r.username !== "") this.setState({ username_def: r.username });
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
  }

  async handleSubmit() {
    this.setState({ button: this.state.button + " is-loading" });

    //Change username
    //set username
    let r = await setUsername(
      auth.getEmail(),
      this.state.username,
      auth.getAccessToken()
    );
    if (r.message === "Success")
      this.setState({ username_def: this.state.username });

    this.setState({ button: "button is-primary" });
  }

  render() {
    return (
      <>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Home</h1>
              <h2 className="subtitle">Welcome</h2>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h1 className="title">Set usermane</h1>
            {this.state.username_def === "" ? (
              <h2 className="subtitle">
                Currently you have no username in our registries. You can set
                your username here.
              </h2>
            ) : (
              <h2 className="subtitle">{`Your username is: ${this.state.username_def}`}</h2>
            )}
            <div className="field">
              <label className="label">Change username</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button
                  className={this.state.button}
                  onClick={this.handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
