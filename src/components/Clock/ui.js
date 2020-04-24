import React from "react";
//import PropTypes from "prop-types";
import "./styles.css";

export class ClockUI extends React.Component {
  //static propTypes = {
  //  currentTime: PropTypes.string
  //};

  render() {
    const { currentTime } = this.props;
    return <div className="clock">{currentTime}</div>;
  }
}
