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
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
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
    searchButtons: {
        color: '#fff',
        minWidth: 'unset',
        '&:first-of-type': {
            marginRight: '8px'
        }
    },
    queueAdd: {
        background: theme.palette.primary.dark,
        '&:hover': {
            background: theme.palette.primary.main
        },
    },
    queueEdit: {
        background: theme.palette.secondary.dark,
        '&:hover': {
            background: theme.palette.secondary.main
        },
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
                </Toolbar>
            </AppBar>
            <List>
                {
                    props.searchResults.map(row => (
                        <div key={row.id}>
                            <ListItem button>
                                <ListItemText primary={row.title} secondary={row.artist} />
                                <Button className={`${props.classes.searchButtons} ${props.classes.queueAdd}`} onClick={() => addToQueue(row.id, singerName)}>
                                    <Add></Add>
                                </Button>
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

function editQueueOptions(id, singerName) {
    console.log('id: ', id)
    console.log('singer name: ', singerName)
}
  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchResults));