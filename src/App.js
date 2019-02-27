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
import Modal from '@material-ui/core/Modal';
import { hideModal } from './redux/actionCreators';
import { MODAL_SEARCH } from './constants';
import SearchResults from './components/modals/SearchResults';

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: lightGreen
  }
});

class App extends React.Component {

    handleClose = () => {

    }

    render() {

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
            <main>
                <Paper>&nbsp;</Paper>
                <ConnectSession/>
                <QueueTable/>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.props.modalShow}
                  onClose={this.props.hideModal}
                > 
                  {modalContentView}
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
