import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalTitle,
  ModalFooter,
  Button,
  InputGroup,
  Input,
} from "reactstrap";
import { Redirect } from "react-router-dom";

class BeerSave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
      rating: "",
      servingStyle: "",
      note: "",
      show: false,
    };
  }

  handleClose = (e) => {
    e.preventDefault();
    this.setState({ show: false });
  };

  handleShow = (e) => {
    e.preventDefault();
    this.setState({ show: true });
  };

  // Save beer
  handleSaveBeer = async (e) => {
    e.preventDefault();
    const { location, token } = this.props;
    const data = {
      beer: {
        name: this.state.name,
        location: location,
        rating: this.state.rating,
        servingStyle: this.state.servingStyle,
        note: this.state.note,
      },
    };
    console.log(location);
    try {
      const response = await fetch("http://localhost:3000/beer/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      });
      console.log(response);
      this.setState({ redirect: "/"}) 
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={{pathname: this.state.redirect}}/>
      );
    }
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          What are we drinking?
        </Button>

        <Modal isOpen={this.state.show} toggle={this.handleClose}>
          <ModalHeader>Beer Check-In</ModalHeader>
          <ModalBody>
            <InputGroup className="mb-3">
              <Input
                type="text"
                onChange={(event) =>
                  this.setState({ name: event.target.value })
                }
                placeholder="Enter Beer Name "
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="select"
                onChange={(event) =>
                  this.setState({ rating: event.target.value })
                }
                placeholder="Give rating"
              >
                <option>Give a rating</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="select"
                onChange={(event) =>
                  this.setState({ servingStyle: event.target.value })
                }
                placeholder="Serving Style"
              >
                <option>Select your serving style</option>
                <option>Draft</option>
                <option>Bottle</option>
                <option>Can</option>
                <option>Taster</option>
                <option>Crowler</option>
                <option>Growler</option>
              </Input>
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="textarea"
                onChange={(event) =>
                  this.setState({ note: event.target.value })
                }
                placeholder="How was it? Leave a note"
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSaveBeer}>
              Save Changes
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default BeerSave;
