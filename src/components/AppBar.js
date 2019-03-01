import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { doSearch, searchTermChanged } from '../redux/actionCreators';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

function SearchAppBar(props) {
  const { classes, connected, doSearch, searchTerm, searchTermChanged } = props;

  let search = <div></div>;
  if (connected) {
    search = (
      <div className={classes.search}>
        <form onSubmit={(e) => doSearch(e, searchTerm)}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={searchTerm}
            onChange={(event) => searchTermChanged(event.target.value)}
          />
        </form>
      </div>);
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/*<IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <MenuIcon />
            </IconButton>*/}
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            KaraSocket
          </Typography>
          <div className={classes.grow} />
          {search}
        </Toolbar>
      </AppBar>
    </div>
  );
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
      searchTerm: state.searchTerm,
      connected: state.connected
  };
}

function mapDispatchToProps(dispatch) {
  return {
    doSearch: (event, searchTerm) => {
      event.preventDefault();
      dispatch(doSearch(searchTerm));
    },
    searchTermChanged: (term) => dispatch(searchTermChanged(term))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchAppBar));