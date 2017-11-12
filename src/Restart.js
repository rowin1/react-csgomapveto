import React, { Component } from 'react';

class Restart extends Component {
  render() {
    if (this.props.enabled) {
      return (
        <button className='ui button'
          onClick= {this.props.onClick}>
          Restart
        </button>
      );
    }
    else {
      return null;
    }
  }
}

export default Restart;
