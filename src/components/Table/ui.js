import React from "react";
import PropTypes from "prop-types";
import "./styles.css";
import { Table } from "react-bootstrap";
import { ErrorMessage } from "../ErrorMessage/container";

export class TableUI extends React.Component {
  static propTypes = {
    headers: PropTypes.array,
    departures: PropTypes.array,
    errorMessage: PropTypes.string,
  };

  /*constructor(props) {
    super(props);
    this.formatTime = this.formatTime.bind(this);
  }
  */

  formatTime = (dateStr) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateStr));
  };

  render() {
    const { headers, departures, errorMessage } = this.props;
    if (errorMessage === null && departures === null) {
      return <p className="loading">Loading...</p>;
    }
    if (errorMessage !== null) {
      return <ErrorMessage errorMessage={errorMessage} />;
    }
    return (
      <Table striped responsive variant="dark">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {departures &&
            departures.map((d, index) => (
              <tr key={index}>
                <td>{d.carrier}</td>
                <td>{this.formatTime(d.departureTime)}</td>
                <td>{d.name}</td>
                <td>{d.vehicle}</td>
                <td>{d.track}</td>
                <td>{d.status}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    );
  }
}
