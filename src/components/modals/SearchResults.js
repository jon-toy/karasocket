import React from 'react'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { addToQueue, hideModal, selectSong } from '../../redux/actionCreators';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    appBar: {
        position: 'relative',
        width: '100%'
      },
    flex: {
        flex: 1,
    },
  });

function SearchResults(props) {
    const { classes, singerName, addToQueue, hideModal, selectedSong, selectSong } = props;

    return (
        <div>
            <AppBar className={classes.appBar}>
                <Toolbar>
                <IconButton color="inherit" onClick={hideModal} aria-label="Close">
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" className={classes.flex}>
                    Search Results
                </Typography>
                <Button color="inherit" onClick={() => addToQueue(selectedSong, singerName)}>
                    Add to Queue
                </Button>
                </Toolbar>
            </AppBar>
            <List>
                {
                    props.searchResults.map(row => (
                        <div>
                            <ListItem 
                                button 
                                selected={selectedSong === row.id}
                                onClick={() => selectSong(row.id)}>
                                <ListItemText primary={row.title} secondary={row.artist} />
                            </ListItem>
                            <Divider/>
                        </div>
                    ))
                }
            </List>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        searchResults: state.searchResults,
        singerName: state.singerName,
        selectedSong: state.selectedSong
    }
  }

function mapDispatchToProps(dispatch) {
    return {
        addToQueue: (id, singerName) => dispatch(addToQueue(id, singerName)),
        hideModal: () => dispatch(hideModal()),
        selectSong: (id) => dispatch(selectSong(id))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchResults));