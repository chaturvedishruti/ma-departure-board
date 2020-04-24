import React from "react";
import { ClockUI } from "./ui";

const FORMAT_OPTIONS = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

class ClockContainer extends React.Component {
  state = {
    currentTime: new Date(),
  };

  formatTime = () => {
    const { currentTime } = this.state;
    return new Intl.DateTimeFormat("en-US", FORMAT_OPTIONS).format(currentTime);
  };

  tick = () => {
    this.setState({
      currentTime: new Date(),
    });
  };

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    return <ClockUI currentTime={this.formatTime()} />;
  }
}

export const Clock = ClockContainer;
