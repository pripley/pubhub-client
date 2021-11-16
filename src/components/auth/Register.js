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
import APIURL from "../../helpers/environment";
import NavBar from "../site/NavBar";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      passwordhash: "",
      username: "",
      redirect: null,
    };
  }

  handleRegister = (e) => {
    e.preventDefault();
    const data = {
      user: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        passwordhash: this.state.passwordhash,
        username: this.state.username,
      },
    };
    fetch(`${APIURL}/user/signup/`, {
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
      return <Redirect to={{ pathname: this.state.redirect }} />;
    }
    return (
      <>
        <NavBar />
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="9" lg="7" xl="4">
                <Form>
                  <h1>Sign up</h1>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      onChange={(event) =>
                        this.setState({ firstName: event.target.value })
                      }
                      placeholder="Enter First Name"
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      onChange={(event) =>
                        this.setState({ lastName: event.target.value })
                      }
                      placeholder="Enter Last Name"
                    />
                  </InputGroup>
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
                  <InputGroup className="mb-4">
                    <Input
                      type="text"
                      onChange={(event) =>
                        this.setState({ username: event.target.value })
                      }
                      placeholder="Enter Username"
                    />
                  </InputGroup>
                  <Button onClick={this.handleRegister} block>
                    Sign Up
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Signup;
