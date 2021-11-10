import React from "react";
import "./App.css";
import NavBar from './components/site/NavBar';
import LandingPage from "./components/landing/LandingPage";
import HomePage from "./components/home/HomePage";
import SearchResults from './components/site/SearchResults';
import BreweryInfo from "./components/brewery/BreweryInfo";
import ViewUser from "./components/site/ViewUser";
import Profile from "./components/site/Profile";
import Login from './components/auth/Login';
import Register from "./components/auth/Register";
import Footer from "./components/site/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: "",
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({
        sessionToken: localStorage.getItem("token"),
      });
    }
  }

  updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    this.setState({
      sessionToken: newToken,
    });
  }

  render() {
    const { sessionToken } = this.state;
    return (
      <div id="main-container">
        <Router>
          <NavBar/>
          <Switch>
            <Route exact path="/">
              {sessionToken ? (
                <HomePage token={sessionToken} />
              ) : (
                <LandingPage/>
              )}
            </Route>
            <Route exact path="/brewery/:id" render={(breweryId) => <BreweryInfo {...breweryId} token={sessionToken}/>}>              
            </Route>
            <Route exact path="/users/:username">
              <ViewUser token={sessionToken}/>
            </Route>
            <Route exact path="/search" render={(brewery) => <SearchResults {...brewery} token={sessionToken}/>}/>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/login">
              <Login updateToken={this.updateToken}/>
            </Route>
            <Route exact path="/register">
              <Register updateToken={this.updateToken}/>
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
