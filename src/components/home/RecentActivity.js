import React, { Component } from "react";
import BeerGet from "../beer/BeerGet";

class RecentActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { token } = this.props;
    return (
      <div>
        <h4 className="weight-bold mb-3">Your Recent Check-Ins</h4>
        <BeerGet token={token} />
      </div>
    );
  }
}
export default RecentActivity;
