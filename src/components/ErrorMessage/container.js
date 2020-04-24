import React from 'react';
import PropTypes from 'prop-types';
import {ErrorMessageUI} from './ui';


class ErrorMessageContainer extends React.Component {

  static propTypes = {
      errorMessage: PropTypes.string
  };

  render() {
    const {errorMessage} = this.props;
    return <ErrorMessageUI errorMessage={errorMessage}/>;
  }
}

export const ErrorMessage = ErrorMessageContainer;
