import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import AppBar from './components/AppBar';
import QueueTable from './components/QueueTable';
import ConnectSession from './components/ConnectSession';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { hideModal } from './redux/actionCreators';
import { MODAL_SEARCH } from './constants';
import SearchResults from './components/modals/SearchResults';
import Slide from '@material-ui/core/Slide';
import PlayerCard from './components/PlayerCard';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8CF2FF',
      main: '#41E9FF',
      dark: '#207480',
      contrastText: '#000000'
    },
    secondary: {
      light: '#80FFC8',
      main: '#33FFA5',
      dark: '#29CC85',
      contrastText: '#000000'
    }
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        background: 'linear-gradient(90deg, rgba(32,116,128,1) 0%, rgba(41,204,133,1) 100%)',
        color: '#fff'
      }
    },
    MuiTypography: {
      h6: {
        fontSize: '1rem',
        fontWeight: '200',
        letterSpacing: '4px',
        textTransform: 'uppercase'
      }
    },
    MuiButton: {
      containedPrimary: {
        background: 'linear-gradient(90deg, rgba(32,116,128,1) 0%, rgba(41,204,133,1) 100%)',
        color: '#fff'
      },
      label: {
        fontWeight: '200',
        letterSpacing: '2px',
      }
    }
  }
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
                
                <Grid item xs={11} sm={5}>
                  {this.props.connected ? <PlayerCard 
                      song={this.props.nowPlaying} 
                      defaultTitle={"Nothing Playing Right Now!"} 
                      defaultArtist={"\r"}
                      defaultSinger={"Hit Play or Add a Song!"}
                      title={"Now Playing"}
                      showControls={this.props.nowPlaying !== null}
                  /> : ''}
                </Grid>
                <Grid item xs={11} sm={5}>
                  {this.props.connected ? <PlayerCard 
                        song={this.props.upNext} 
                        defaultTitle={this.props.upNext && this.props.upNext.status === 'loading' ? 'Loading...' : 'Nothing coming up!'}
                        defaultArtist={"\r"}
                        defaultSinger={this.props.upNext && this.props.upNext.status === 'loading' ? '' : 'Add a Song!'}
                        title={"Up Next"}
                        showControls={this.props.upNext !== null && this.props.nowPlaying === null}
                    /> : ''}
                </Grid>
                <Grid item xs={11} sm={10}>
                  {this.props.connected ? <QueueTable/> : ''}
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
    modalShow: state.modalShow,
    connected: state.connected,
    nowPlaying: state.nowPlaying,
    upNext: state.upNext
  }
}

function mapDispatchToProps(dispatch) {
  return {
    hideModal: () => dispatch(hideModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
