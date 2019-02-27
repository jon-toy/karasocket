import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import AppBar from './components/AppBar';
import QueueTable from './components/QueueTable';
import ConnectSession from './components/ConnectSession';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import lightGreen from '@material-ui/core/colors/lightGreen';

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: lightGreen
  }
});

function App(props){
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <header className="App-header">
              <AppBar/>
          </header>
          <main>
              <Paper>&nbsp;</Paper>
              <ConnectSession/>
              <QueueTable/>
          </main>
        </MuiThemeProvider>
      </div>
    );
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(App);
