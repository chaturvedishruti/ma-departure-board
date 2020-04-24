import React from "react";
import { DateUI } from "./ui";

class DateContainer extends React.Component {
  state = {
    currentDate: new Date(),
  };

  render() {
    const { currentDate } = this.state;
    return <DateUI currentDate={currentDate} />;
  }
}

export const DateBlock = DateContainer;
