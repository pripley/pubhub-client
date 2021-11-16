import React, { Component } from "react";
import {
  Row,
  Col,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import Search from "./Search";
import logo from "../../assets/images/brewpub_logo.svg";

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

  render() {
    const { token, firstName } = this.props;
    console.log(token);
    console.log(firstName);
    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    }
    return (
      <>
        <Navbar>
          <Container>
            <Row>
              <Col>
                <NavbarBrand className="ms-0">
                  <Link to="/">
                    <img src={logo} alt="Brewpub logo" />
                  </Link>
                </NavbarBrand>
              </Col>
              <Col>
                <Nav className="justify-content-end">
                  {token ? (
                    <>
                      <UncontrolledDropdown inNavbar nav>
                        <DropdownToggle caret nav>
                          Hi, {firstName}
                        </DropdownToggle>
                        <DropdownMenu end>
                          <DropdownItem className="small">
                            <Link to="/profile">Profile</Link>
                          </DropdownItem>
                          <DropdownItem
                            className="small"
                            onClick={this.handleLogout}
                            href="/"
                          >
                            Logout
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </>
                  ) : (
                    <>
                      <NavItem>
                        <NavLink>
                          <Link to="/login">Login</Link>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink>
                          <Link to="/register">Sign up</Link>
                        </NavLink>
                      </NavItem>
                    </>
                  )}
                </Nav>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default NavBar;
