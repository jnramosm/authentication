import React from "react";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import NavBar from "./components/navBar";
import PrivateRoute from "./components/privateroute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { refreshToken } from "./utils";
import auth from "./auth/auth";
import LogOut from "./pages/logout/logout";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    let res = await refreshToken();
    auth.setAccessToken(res.accessToken);
    auth.setEmail(res.email);
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Router>
          <h1>Loading...</h1>
        </Router>
      );
    } else {
      return (
        <Router>
          <NavBar />
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={LogOut} />
            <PrivateRoute exact path="/" component={Home} />
          </Switch>
        </Router>
      );
    }
  }
}

export default App;
