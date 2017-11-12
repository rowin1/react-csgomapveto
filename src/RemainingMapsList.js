import React, { Component } from 'react';

import MapChoice from './MapChoice';

class RemainingMapsList extends Component {
  render() {
    const mapchoiceComponents = this.props.maps.map((map) => {
      if (!map.isBanned && !map.isPicked && !map.isSelected) {
        return (
          <MapChoice
            name={map.name}
            image={map.image}
            onClick={() => this.props.onClick(map.name)}
          />
        );
      } else {
        return null;
      }
    }
  )

    return (
      <div className='ui centered cards'>
        {mapchoiceComponents}
      </div>
    );
  }
}

export default RemainingMapsList;
