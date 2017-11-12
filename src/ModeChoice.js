import React, { Component } from 'react';

class ModeChoice extends Component {
  render() {
    return (
    <div className='ui card'>
      <div className='ui medium image'>
          <img
            src={this.props.image}
            onClick = {this.props.onClick}
          />
      </div>
    </div>
    )
  }
}

export default ModeChoice;
