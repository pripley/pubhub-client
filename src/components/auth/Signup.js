import React, { Component } from "react";
import { Input, InputGroup, Row, Col, Button, Form, Container } from "reactstrap";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userName: "",
    };
    this.firstName = this.firstName.bind(this);
    this.lastName = this.lastName.bind(this);
    this.email = this.email.bind(this);
    this.password = this.password.bind(this);
    this.userName = this.userName.bind(this);
    this.register = this.register.bind(this);
  }

  firstName(event) {
    this.setState({ firstName: event.target.value });
  }
  lastName(event) {
    this.setState({ lastName: event.target.value });
  }
  email(event) {
    this.setState({ email: event.target.value });
  }
  password(event) {
    this.setState({ password: event.target.value });
  }
  userName(event) {
    this.setState({ userName: event.target.value });
  }

  register(event) {
    event.preventDefault()
    fetch("http://localhost:3000/user/signup/", {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        username: this.state.username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.updateToken(data.sessionToken)        
      });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Form>
                <div class="row" className="mb-2 pageheading">
                  <div class="col-sm-12 btn btn-primary">Sign Up</div>
                </div>
                <InputGroup className="mb-3">
                  <Input
                    type="text"
                    onChange={this.firstName}
                    placeholder="Enter First Name"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <Input
                    type="text"
                    onChange={this.lastName}
                    placeholder="Enter First Name"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <Input
                    type="text"
                    onChange={this.email}
                    placeholder="Enter Email"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <Input
                    type="password"
                    onChange={this.password}
                    placeholder="Enter Password"
                  />
                </InputGroup>
                <InputGroup className="mb-4">
                  <Input
                    type="text"
                    onChange={this.userName}
                    placeholder="Enter City"
                  />
                </InputGroup>
                <Button onClick={this.register} color="success" block>
                  Sign Up
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Signup;
