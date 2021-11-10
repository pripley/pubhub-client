import React from "react";
import { Container, Row } from "reactstrap";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="responsible-message">
        <Container>
          <Row><p className="center">PLEASE DRINK RESPONSIBLY</p></Row>
        </Container>
      </div>
      <footer>
        <Container>
          <Row>
            <p>&copy; PubHub 2020</p>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
