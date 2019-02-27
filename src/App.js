import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import AppBar from './components/AppBar';
import QueueTable from './components/QueueTable';
import ConnectSession from './components/ConnectSession';
import Paper from '@material-ui/core/Paper';

function App(props){
    return (
      <div className="App">
        <header className="App-header">
            <AppBar/>
        </header>
        <main>
            <Paper>&nbsp;</Paper>
            <ConnectSession/>
            <QueueTable/>
        </main>
      </div>
    );
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(App);
