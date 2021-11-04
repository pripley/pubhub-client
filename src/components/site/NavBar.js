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
import { Link } from "react-router-dom";
import SessionProvider from "../utils/SessionProvider";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: "",
    };
  }

  handleLogout() {
    localStorage.clear();
    this.setState({
      sessionToken: "",
    });
  }

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
    return (
      <Navbar>
        <Container fluid>
          <NavbarBrand href="/">PubHub</NavbarBrand>
          <Nav className="justify-content-end">
            {sessionToken ? (
              <NavItem>
                <NavLink onClick={this.handleLogout}>Logout</NavLink>
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
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
