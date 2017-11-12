import React, { Component } from 'react';

class TurnStatus extends Component {
  render() {
    if (this.props.choice === 'auto') {
      return null;
    } else {
        return (
          <div>
            <h1>{this.props.whosTurn} turn to {this.props.choice}:</h1>
          </div>
        );
    }
  }
}

export default TurnStatus;
