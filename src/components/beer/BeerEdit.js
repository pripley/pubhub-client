import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  InputGroup,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";

class BeerEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.beer.name,
      location: props.beer.location,
      rating: props.beer.rating,
      servingStyle: props.beer.servingStyle,
      note: props.beer.note,
      show: false,
    };
  }

  handleClose = () => {   
    this.setState({ show: false });
  };

  handleShow = () => {    
    this.setState({ show: true });
  };

  // Save beer
  handleEditBeer = async () => {
    const { beer, token } = this.props;
    const { name, location, rating, servingStyle, note } = this.state;
    console.log(location)
    console.log(beer.id)
    const data = {
      beer: {
        name: name,
        location: location,
        rating: rating,
        servingStyle: servingStyle,
        note: note,
      },
    };
    try {
      const response = await fetch(`http://localhost:3000/beer/${beer.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      });
      console.log(response);
      this.handleClose()
      this.props.handleFetchBeer()
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { name, rating, servingStyle, note } = this.state;
    return (
      <>
        <Link to="" onClick={this.handleShow}>Update</Link>

        <Modal isOpen={this.state.show} toggle={this.handleClose}>
          <ModalHeader>Update Your Check-In</ModalHeader>
          <ModalBody>
            <InputGroup className="mb-3">
              <Input
                type="text"
                value={name}
                onChange={(event) =>
                  this.setState({ name: event.target.value })
                }
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="select"
                value={rating}
                onChange={(event) =>
                  this.setState({ rating: event.target.value })
                }
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
                value={servingStyle}
                onChange={(event) =>
                  this.setState({ servingStyle: event.target.value })
                }
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
                value={note}
                onChange={(event) =>
                  this.setState({ note: event.target.value })
                }
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleEditBeer}>
              Save Changes
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default BeerEdit;
