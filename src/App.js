import React, { Component } from 'react';
import logo from './images/csgo-logo.png';
import MAPS from './maps';
import './App.css';

import PickedMaps from './PickedMaps';
import RemainingMapsList from './RemainingMapsList';
import TurnStatus from './TurnStatus';

class App extends Component {

  state = {
    whosTurn: "Team A's",
    turnNumber: 0,
    bestOf: 'three',
    maps: MAPS,
  }

  getTurnOrder(i) {
    if (i === 'one') {
      return ['ban', 'ban', 'ban', 'ban', 'ban', 'ban', 'auto'];
    }
    else if (i === 'five') {
      return ['ban', 'ban', 'pick', 'pick', 'pick', 'pick', 'auto'];
    }
    else if (i === 'three') {
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
    const turns = this.getTurnOrder(this.state.bestOf);
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
    const turns = this.getTurnOrder(this.state.bestOf);
    const choice = turns[this.state.turnNumber];

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
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
        </div>
      </div>
    );
  }
}

export default App;
