import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "reactstrap";
import APIURL from "../../helpers/environment";

class BreweryEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Save brewery as favorite
  handleEditBrewery = async () => {
    const { token, brewery } = this.props;
    const favorite = brewery.favorite === false ? true : false;
    const data = {
      brewery: {
        name: brewery.name,
        street: brewery.street,
        city: brewery.city,
        state: brewery.state,
        zip: brewery.postal_code,
        type: brewery.type,
        favorite: favorite,
      },
    };
    try {
      const response = await fetch(`${APIURL}/brewery/${brewery.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      });
      console.log(response);
      this.props.handleFetchBrewery(brewery.id)
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { brewery } = this.props;
    return (
      <>
         {brewery.favorite === false ? (
                <Button className="favorite" onClick={this.handleEditBrewery}>
                  <FontAwesomeIcon icon={["far", "bookmark"]} />
                </Button>
              ) : (
                <Button className="favorite" onClick={this.handleEditBrewery}>
                  <FontAwesomeIcon icon={["fas", "bookmark"]} />
                </Button>
              )}   
      </>
    );
  }
}
export default BreweryEdit;