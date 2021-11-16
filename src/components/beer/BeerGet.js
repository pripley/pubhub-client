import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import BeerEdit from "./BeerEdit";
import APIURL from "../../helpers/environment";
import beerPic from "../../assets/images/beer_pic.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faBookmark,
  faBeer,
  faUsers,
  faCalendarAlt,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

class BeerGet extends Component {
  constructor(props) {
    super(props);
    this.state = { beers: [], breweries: [], breweryID: 0, redirect: null };
  }

  handleDeleteBeer = (beer) => async (e) => {
    e.preventDefault();
    const { token } = this.props;
    try {
      console.log(beer.id);
      console.log(token);
      const response = await fetch(`${APIURL}/beer/${beer.id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      });
      console.log(response);
      this.handleFetchBeer();
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  handleFetchBeer = async () => {
    const { token } = this.props;
    console.log(token);
    try {
      const response = await fetch(`${APIURL}/beer/`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      });
      console.log(response);
      const json = await response.json();
      this.setState({ beers: json.beers });
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  handleFetchAllBreweries = (breweryName) => async (e) => {
    e.preventDefault();
    console.log(breweryName);
    const { token } = this.props;
    try {
      const response = await fetch(`${APIURL}/brewery/`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      });
      console.log(response);
      const json = await response.json();
      this.setState({ breweries: json.breweries });
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }

    const breweries = this.state.breweries;
    console.log(breweries);
    breweries.forEach((brewery, index) => {
      console.log(brewery.id);
      this.setState({ breweryId: brewery.id });
      brewery.name === breweryName
        ? this.setState({ redirect: `/brewery/${brewery.id}` })
        : this.setState({ redirect: null });
    });
  };

  componentDidMount() {
    this.handleFetchBeer();
  }

  formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: { breweryId: this.state.breweryId },
          }}
        />
      );
    }
    const { token } = this.props;
    const { beers } = this.state;
    const divStyle = {
      backgroundImage: `url(${beerPic})`,
      backgroundSize: "cover",
      height: "8rem",
      borderRadius: ".75rem .75rem 0 0",
    };
    console.log(beers);
    console.log(token);
    const beerList = () =>
      beers.map((beer, index) => {
        const dateString = Date.parse(beer.createdAt);
        return (
          <Col xs="3" key={index}>
            <Card>
              <div className="card-pic" style={divStyle}></div>
              <CardBody>
                <CardTitle>
                  <Row>
                    <Col xs="9">
                      <h5 className="weight-bold">{beer.name}</h5>
                    </Col>
                    <Col xs="3" className="justify-content-end">
                      <Nav className="justify-content-end">
                        <UncontrolledDropdown inNavbar nav>
                          <DropdownToggle nav className="pt-0 pe-0 pb-0">
                            <FontAwesomeIcon
                              icon={faEllipsisV}
                              className="mb-3"
                            />
                          </DropdownToggle>
                          <DropdownMenu end>
                            <DropdownItem>
                              <BeerEdit
                                beer={beer}
                                token={token}
                                handleFetchBeer={this.handleFetchBeer}
                              />
                            </DropdownItem>
                            <DropdownItem>
                              <Link
                                className="small weight-bold text-red"
                                to=""
                                onClick={this.handleDeleteBeer(beer)}
                              >
                                {" "}
                                Delete
                              </Link>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>{" "}
                      </Nav>
                    </Col>
                  </Row>
                </CardTitle>
                <CardText className="mb-0">
                  <Link
                    to=""
                    onClick={this.handleFetchAllBreweries(beer.location)}
                  >
                    {beer.location}
                  </Link>
                </CardText>
                <CardText className="mb-0">{beer.servingStyle}</CardText>
                <CardText>Rating: {beer.rating}</CardText>
                <CardText className="mb-0 small">
                  Check-in: {this.formatter.format(new Date(dateString))}
                </CardText>
              </CardBody>
            </Card>
          </Col>
        );
      });
    return <Row>{beerList()}</Row>;
  }
}
export default BeerGet;
