import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faBookmark, faBeer, faUsers, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'


class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Container className="features">
          <Row className="mt-5 mb-5">
            <Col xl="4" className="text-center">
            <FontAwesomeIcon icon={ faBeer } className="mb-3"/>
              <h3>Check in and rate beer</h3>
              <h5>
                Keep track of what you’ve tried and what you thought of it by
                checking in a beer and rating it.
              </h5>              
            </Col>
            <Col xl="4" className="text-center">
            <FontAwesomeIcon icon={ faBookmark } className="mb-3"/>
              <h3>Search for breweries and save your favorites</h3>              
            </Col>
            <Col xl="4" className="text-center">
            <FontAwesomeIcon icon={ faCalendarAlt } className="mb-3"/>
              <h3>Stay updated on local events</h3>
<h5>Coming soon!</h5>              
            </Col>
          </Row>
        </Container>
        
      </>
    );
  }
}
export default Features;
