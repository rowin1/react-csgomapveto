import React, { Component } from 'react';
import logo from './images/csgo-logo.png';
import './App.css';

import MODES from './modes';
import MapVeto from './MapVeto';
import ModeSelect from './ModeSelect';


class App extends Component {
  state = {
    vetoMode: 'none'
  }

  handleModeSelect = (i) => {
    const nextVetoMode = i;
    this.setState({
      vetoMode: nextVetoMode,
    });
  }

  handleRestart = () => {
    const nextVetoMode = 'none';
    this.setState({
      vetoMode: nextVetoMode,
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
            modes={MODES}
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
            bestOf={this.state.vetoMode}
            onRestart={ () => this.handleRestart()}
          />
        </div>
      );
    }
  }

}

export default App;
