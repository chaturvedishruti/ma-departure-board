import React from "react";
import PropTypes from "prop-types";
import { TableUI } from "./ui";
import get from "lodash/get";
import * as axios from "axios"; // for making API calls

const BASE_URL = "https://api-v3.mbta.com";
const ROUTE_TYPE = 2; // 2=commuter rail
// const DIRECTION_ID = 0; // departuring from
const INCLUDES = ["stop", "trip", "schedule"];
const HEADERS = [
  "Carrier",
  "Time",
  "Destination",
  "Train#",
  "Track#",
  "Status",
];

class TableContainer extends React.Component {
  state = {
    errorMessage: null,
    departures: null,
  };

  static propTypes = {
    setSelection: PropTypes.func,
    selectedStation: PropTypes.string,
  };

  buildUrl = (station) => {
    // const filters = `filter[stop]=${station}&filter[route_type]=${ROUTE_TYPE}&filter[direction_id]=${DIRECTION_ID}`;
    const filters = `filter[stop]=${station}&filter[route_type]=${ROUTE_TYPE}`;

    return `${BASE_URL}/predictions?${filters}&include=${INCLUDES.join()}`;
  };

  processResponse = (response) => {
    const included = response.included;
    const predictionsResponse = response.data;
    if (predictionsResponse && included) {
      // if departure_time is null, it means a final stop, so we remove those:
      const filteredDepartures = predictionsResponse.filter(
        (dp) => dp.attributes.departure_time !== null
      );

      const departures = [];

      // get trips, stops and schedules which we'll read from later:
      const trips = included.filter((dp) => dp.type === "trip");
      const stops = included.filter((dp) => dp.type === "stop");
      const schedules = included.filter((dp) => dp.type === "schedule");

      filteredDepartures.forEach((p) => {
        const status = get(p, "attributes.status");
        const name = get(p, "relationships.route.data.id");

        // get details from the stop by stopId so we can get the track
        const stopId = get(p, "relationships.stop.data.id");
        const stopInfo = stops.find((stop) => stop.id === stopId);
        const track = get(stopInfo, "attributes.platform_code");

        // get details from the trip by tripId so we can get the train #
        const tripId = get(p, "relationships.trip.data.id");
        const tripInfo = trips.find((trip) => trip.id === tripId);
        const vehicle = get(tripInfo, "attributes.name");

        // get details from the schedule by scheduleId so we can get the departure time
        const scheduleId = get(p, "relationships.schedule.data.id");
        //get details for MBTA as the only carrier
        const carrier = "MBTA";
        const scheduleInfo = schedules.find(
          (schedule) => schedule.id === scheduleId
        );
        const departureTime = get(scheduleInfo, "attributes.departure_time");

        // gather all the information
        departures.push({
          name,
          departureTime: new Date(departureTime),
          status,
          vehicle,
          track: track !== null ? track : "TBD",
          carrier,
        });
      });
      // sort departures in ascending order
      departures.sort((a, b) => a.departureTime - b.departureTime);
      this.setState({ departures });
    }
  };

  getDepartures = (station) => {
    const url = this.buildUrl(station);

    const t = this;
    axios
      .get(url)
      .then(function (response) {
        if (response.status === 200 && response.data) {
          t.setState({ errorMessage: null });
          t.processResponse(response.data);
        }
      })
      .catch(function (error) {
        t.setState({ errorMessage: error });
      });
  };

  setTimer() {
    const { selectedStation } = this.props;
    this.intervalID = setInterval(
      () => this.getDepartures(selectedStation),
      60000
    );
  }

  componentDidMount() {
    const { selectedStation } = this.props;
    this.getDepartures(selectedStation);

    this.setTimer();
  }

  componentDidUpdate(prevProps) {
    const { selectedStation } = this.props;

    if (prevProps.selectedStation !== selectedStation) {
      this.getDepartures(selectedStation);

      // clearInterval and reset again:
      clearInterval(this.intervalID);
      this.setTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const { departures, errorMessage } = this.state;
    const { setSelection } = this.props;
    return (
      <TableUI
        headers={HEADERS}
        departures={departures}
        setSelection={setSelection}
        errorMessage={errorMessage}
      />
    );
  }
}

export const Table = TableContainer;
