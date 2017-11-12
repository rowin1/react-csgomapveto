import React, { Component } from 'react';

class MapChoice extends Component {
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

export default MapChoice;
