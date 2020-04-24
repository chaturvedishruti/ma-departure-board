import React from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";
//import './styles.css';

export class ErrorMessageUI extends React.Component {
  static propTypes = {
    errorMessage: PropTypes.string,
  };

  render() {
    const { errorMessage } = this.props;
    return <Alert variant="danger">{errorMessage}</Alert>;
  }
}
