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
        <h2 className="title">Your Recent Activity</h2>
        <BeerGet token={token} />
      </div>
    );
  }
}
export default RecentActivity;
