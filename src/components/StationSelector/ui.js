import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

export class StationSelectorUI extends React.Component {
  static propTypes = {
    options: PropTypes.array,
    onStationSelection: PropTypes.func,
  };

  render() {
    const { options, onStationSelection } = this.props;
    return (
      <div className="StationSelector">
        <select onChange={onStationSelection} defaultValue={options[0].value}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
