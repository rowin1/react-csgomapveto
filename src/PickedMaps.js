import React, { Component } from 'react';
import MapChoice from './MapChoice';

class PickedMaps extends Component {
  render() {
    const pickedMaps = this.props.maps.sort((a, b) => (
      a.number - b.number
    ));
    const pickedmapComponents = pickedMaps.map((map) => {
      if (map.isPicked || map.isSelected) {
        return (
          <MapChoice
            name={map.name}
            image={map.image}
          />
        );
      } else {
        return null;
      }
    }
  )

    return (
      <div className='ui green centered cards'>
        {pickedmapComponents}
      </div>
    );
  }
}

export default PickedMaps;
