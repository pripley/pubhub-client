import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Container,
} from "reactstrap";
import { Redirect } from "react-router-dom";
import SessionProvider from "../utils/SessionProvider";
import Search from "./Search";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: "",
      redirect: null,
    };
  }

  handleLogout = () => {
    localStorage.clear();
    this.setState({ sessionToken: "", redirect: "/" });
  };

  componentDidMount() {
    const sessionToken = SessionProvider.getSessionToken();
    if (sessionToken) {
      this.setState({
        sessionToken: sessionToken,
      });
    }
  }

  render() {
    const { sessionToken } = this.state;
    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    }
    return (
      <>
        <Navbar>
          <NavbarBrand href="/">PubHub</NavbarBrand>
          <Nav className="justify-content-end">
            {sessionToken ? (
              <NavItem>
                <NavLink onClick={this.handleLogout} href="/">
                  Logout
                </NavLink>
              </NavItem>
            ) : (
              <>
                <NavItem>
                  <NavLink href="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/register">Sign up</NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Navbar>        
      </>
    );
  }
}

export default NavBar;
