import React, { Component } from 'react';
import logo from './images/csgo-logo.png';
import './App.css';

import MapVeto from './MapVeto';
import ModeSelect from './ModeSelect';

class App extends Component {
  state = {
    vetoMode: 'none',
    turnOrder: null,
  }

  handleModeSelect = (i) => {
    const nextVetoMode = i.name;
    const nextTurnOrder = i.turnOrder;
    this.setState({
      vetoMode: nextVetoMode,
      turnOrder: nextTurnOrder
    });
  }

  handleRestart = () => {
    const nextVetoMode = 'none';
    const nextTurnOrder = null;
    this.setState({
      vetoMode: nextVetoMode,
      turnOrder: nextTurnOrder
    });
  }

  render() {
    if (this.state.vetoMode === 'none') {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <ModeSelect
            onClick={i => this.handleModeSelect(i)}
          />
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <MapVeto
            turnOrder={this.state.turnOrder}
            onRestart={ () => this.handleRestart()}
          />
        </div>
      );
    }
  }

}

export default App;
