import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const FORMAT_OPTIONS = {
  year: "numeric",
  month: "short",
  weekday: "short",
  day: "2-digit",
};

export class DateUI extends React.Component {
  static propTypes = {
    currentDate: PropTypes.object,
    formatDate: PropTypes.func,
  };

  /* constructor(props) {
    super(props);
    this.formatDate = this.formatDate.bind(this);
  }
*/

  formatDate = () => {
    const { currentDate } = this.props;
    return new Intl.DateTimeFormat("en-US", FORMAT_OPTIONS).format(currentDate);
  };

  render() {
    return <div className="date">{this.formatDate()}</div>;
  }
}
