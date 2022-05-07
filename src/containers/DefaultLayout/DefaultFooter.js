import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const year = new Date().getFullYear()

    return (
      <React.Fragment>
        <span><a href="http://www.innates.my">INNATES</a> &copy; {year}</span>
        <span className="ml-auto">Powered by <a href="http://www.innates.my">IoT-Wave</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
