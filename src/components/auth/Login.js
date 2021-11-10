import React, { Component } from "react";
import {
  Input,
  InputGroup,
  Row,
  Col,
  Button,
  Form,
  Container,
} from "reactstrap";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passwordhash: "",
    };
  }

  handleLogin = (event) => {
    event.preventDefault();
    const data = {
      user: {
        email: this.state.email,
        passwordhash: this.state.passwordhash,
      },
    };
    fetch("http://localhost:3000/user/login/", {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.updateToken(data.sessionToken);
        this.setState({ redirect: "/" });
      });
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={{pathname: this.state.redirect}}/>
      );
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Form>
                <h1>Log in</h1>
                <InputGroup className="mb-3">
                  <Input
                    type="text"
                    onChange={(event) =>
                      this.setState({ email: event.target.value })
                    }
                    placeholder="Enter Email"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <Input
                    type="password"
                    onChange={(event) =>
                      this.setState({ passwordhash: event.target.value })
                    }
                    placeholder="Enter Password"
                  />
                </InputGroup>
                <Button onClick={this.handleLogin} block>
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
