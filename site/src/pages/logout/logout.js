import React from "react";
import { userLogout } from "../../utils";
import auth from "../../auth/auth";

export default class LogOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    let res = await userLogout();
    if (res.message === "Success") {
      auth.setAccessToken("");
      auth.setEmail("");
      this.props.history.replace("/login");
    }
  }

  render() {
    return (
      <div>
        <h1>Logging out...</h1>
      </div>
    );
  }
}
