import React, { Component } from 'react';

import MAPS from './maps';

import PickedMaps from './PickedMaps';
import RemainingMapsList from './RemainingMapsList';
import TurnStatus from './TurnStatus';
import Restart from './Restart';

class MapVeto extends Component {
  state = {
    whosTurn: "Team A's",
    turnNumber: 0,
    maps: MAPS,
  }

  getTurnOrder() {
    if (this.props.bestOf === 'one') {
      return ['ban', 'ban', 'ban', 'ban', 'ban', 'ban', 'auto'];
    }
    else if (this.props.bestOf === 'five') {
      return ['ban', 'ban', 'pick', 'pick', 'pick', 'pick', 'auto'];
    }
    else if (this.props.bestOf === 'three') {
      return ['ban', 'ban', 'pick', 'pick', 'ban', 'ban', 'auto'];
    }
    else {
      return ['ban', 'ban', 'pick', 'pick', 'ban', 'ban', 'auto'];
    }
  }

  getNextWhosTurn() {
    if (this.state.whosTurn === "Team A's") {
      return "Team B's";
    } else {
      return "Team A's";
    }
  }

  mapsRemaining() {
    const remainingMaps = this.state.maps.filter((map) => {
      if (!map.isBanned && !map.isSelected && !map.isPicked) {
        return map.name;
        }
      }
    );
    return remainingMaps.length;
  }

  handleMapClick = (i) => {
    const turns = this.getTurnOrder(this.props.bestOf);
    const choice = turns[this.state.turnNumber];
    if (this.mapsRemaining() > 2) {
      if (choice === 'ban') {
        this.handleMapBan(i);
      }
      else if (choice === 'pick') {
        this.handleMapPick(i);
      }
    }
    else {
      this.handleAutoSelect(i , choice);
    }
  }

  handleAutoSelect(i, choice) {
    const nextMaps = this.state.maps.map((map) => {
      if (map.name === i) {
        if (choice === 'ban')
         {
            return Object.assign({}, map, {
             isBanned: true,
             number: this.state.turnNumber,
         });
      } else if (choice === 'pick') {
        return Object.assign({}, map, {
          isPicked: true,
          number: this.state.turnNumber,
        });
      }
      }
       else if (!map.isBanned && !map.isPicked) {
        return Object.assign({}, map, {
          isSelected: true,
          number: this.state.turnNumber + 1,
        });
      } else {
        return map;
      }
    });

    const nextWhosTurn = this.getNextWhosTurn();

    this.setState({
      maps : nextMaps,
      turnNumber: this.state.turnNumber + 1,
      whosTurn: nextWhosTurn,
    });
  }

  handleMapPick(i) {
    const nextWhosTurn = this.getNextWhosTurn();
    const nextTurnNumber = this.state.turnNumber + 1;
    const nextMaps = this.state.maps.map((map) => {
      if (map.name === i) {
        return Object.assign({}, map, {
          isPicked: true,
          number: this.state.turnNumber,
        });
      } else {
        return map;
      }
    });

    this.setState({
      maps : nextMaps,
      turnNumber: nextTurnNumber,
      whosTurn: nextWhosTurn,
    });
  }

  handleMapBan(i) {
    const nextWhosTurn = this.getNextWhosTurn();
    const nextTurnNumber = this.state.turnNumber + 1;
    const nextMaps = this.state.maps.map((map) => {
      if (map.name === i) {
        return Object.assign({}, map, {
          isBanned: true,
          number: this.state.turnNumber,
        });
      } else {
        return map;
      }
    });

    this.setState({
      maps : nextMaps,
      turnNumber: nextTurnNumber,
      whosTurn: nextWhosTurn,
    });
  }


  render() {
    const turns = this.getTurnOrder();
    const choice = turns[this.state.turnNumber];
    const done = (0 === this.mapsRemaining());

    return (
      <div>
        <PickedMaps
          maps={this.state.maps}
        />
        <TurnStatus
          whosTurn={this.state.whosTurn}
          choice={choice}
        />
        <RemainingMapsList
          maps={this.state.maps}
          onClick={i => this.handleMapClick(i)}
        />
        <Restart
          enabled={done}
          onClick={this.props.onRestart}
        />
      </div>
    );
  }
}

export default MapVeto;
