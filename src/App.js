import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import AppBar from './components/AppBar';
import QueueTable from './components/QueueTable';
import ConnectSession from './components/ConnectSession';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import lightGreen from '@material-ui/core/colors/lightGreen';

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: lightGreen
  }
});

const styles = theme => ({
  karaBody: {
    margin: theme.spacing.unit * 2
  },
});

function App(props){
    const { classes } = props;
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <header className="App-header">
              <AppBar/>
          </header>
          <main className={classes.karaBody}>
            <Grid container spacing={16}>
              <Grid item xs={12} sm={10}>
                <ConnectSession/>
              </Grid>
              <Grid item xs={12} sm={10}>
                <QueueTable/>
              </Grid>
            </Grid>
          </main>
        </MuiThemeProvider>
      </div>
    );
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(withStyles(styles)(App));
