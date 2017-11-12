import React, { Component } from 'react';

import ModeChoice from './ModeChoice';

class ModeSelect extends Component {

  render() {
    const modechoiceComponents = this.props.modes.map((mode) => {
      return (
          <ModeChoice
            name={mode.name}
            image={mode.image}
            onClick={() => this.props.onClick(mode.name)}
          />
        );
      }
    );

    return (
      <div>
        <h1> Select number of maps to be played: </h1>
        <div className='ui centered cards'>
          {modechoiceComponents}
        </div>
      </div>
    );
  }
}

export default ModeSelect;
