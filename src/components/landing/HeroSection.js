import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import Search from "../site/Search";
import logo from "../../assets/images/brewpub_logo.svg";

const HeroSection = (props) => {
  return (
    <div className="hero">
      <Container>
        <Row>
          <Col>
            <Nav className="justify-content-end mt-3">
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/register">Sign up</NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Container>
      <Container className="hero-search center">
        <Row className="mb-5">
          <Col>
            <img src={logo} alt="Brewpub logo" />
          </Col>
        </Row>
        <Search />
      </Container>
    </div>
  );
};

export default HeroSection;
