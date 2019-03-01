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
import Dialog from '@material-ui/core/Dialog';
import { hideModal } from './redux/actionCreators';
import { MODAL_SEARCH } from './constants';
import SearchResults from './components/modals/SearchResults';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: lightGreen
  },
  typography: {
    useNextVariants: true,
  },
});

const styles = theme => ({
  karaBody: {
    margin: theme.spacing.unit * 2
  },
});

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class App extends React.Component {

    handleClose = () => {

    }

    render() {

      const { classes } = this.props;

      let modalContentView = <div></div>;

      if (this.props.modalContent === MODAL_SEARCH) {
        modalContentView = <SearchResults/>
      }
      
      return (
        <div className="App">
          <MuiThemeProvider theme={theme}>
            <header className="App-header">
                <AppBar/>
            </header>
            <main className={classes.karaBody}>
              <Grid container
                spacing={16}
                justify="center"
                alignItems="center">
                <Grid item xs={11} sm={10}>
                  <ConnectSession/>
                </Grid>
                <Grid item xs={11} sm={10}>
                  <QueueTable/>
                </Grid>
              </Grid>
                <Dialog
                  fullScreen
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.props.modalShow}
                  onClose={this.props.hideModal}
                  TransitionComponent={Transition}
                > 
                  {modalContentView}
                </Dialog>
            </main>
          </MuiThemeProvider>
        </div>
      );
    }
}

function mapStateToProps(state) {
  return {
    modalContent: state.modalContent,
    modalShow: state.modalShow
  }
}

function mapDispatchToProps(dispatch) {
  return {
    hideModal: () => dispatch(hideModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
