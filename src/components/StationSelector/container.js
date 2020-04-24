import React from "react";
import { StationSelectorUI } from "./ui";
import PropTypes from "prop-types";

class StationSelectorContainer extends React.Component {
  state = {
    selectedStation: null,
  };

  static propTypes = {
    options: PropTypes.array,
    setSelection: PropTypes.func,
  };

  onStationSelection = (event) => {
    const { setSelection } = this.props;
    this.setState({ selectedStation: event.target.value });
    setSelection(event.target.value);
  };

  render() {
    const { setSelection, options } = this.props;
    return (
      <StationSelectorUI
        options={options}
        onStationSelection={this.onStationSelection}
        setSelection={setSelection}
      />
    );
  }
}

export const StationSelector = StationSelectorContainer;
