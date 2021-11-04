import React, { Component } from "react";
import { Input, InputGroup, Row, Col, Button, Form, Container } from "reactstrap";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",      
    };

    this.email = this.email.bind(this);
    this.password = this.password.bind(this);    
    this.login = this.login.bind(this);
  }

  email(event) {
    this.setState({ email: event.target.value });
  }
  password(event) {
    this.setState({ password: event.target.value });
  }
  
  login(event) {
    event.preventDefault()
    fetch("http://localhost:3000/user/login/", {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password        
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
                <h2>Log in</h2>                
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
                <Button onClick={this.login} color="success" block>
                  Log in
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
