import React from 'react'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';

const styles = theme => ({
    paper: {
      position: 'absolute',
      width: 800,
      maxHeight: '100vh',
      overflowY: 'scroll',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
      },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
  });

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

function Modal(props) {
    const { classes } = props;
    return (
        <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" align="center">
                Search Results
            </Typography>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <CustomTableCell align="right">Song</CustomTableCell>
                    <CustomTableCell align="right">Artist</CustomTableCell>
                    <CustomTableCell align="right">Duration</CustomTableCell>
                    <CustomTableCell align="right"></CustomTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {props.searchResults.map((row, index) => (
                    <TableRow className={classes.row} key={index}>
                    <CustomTableCell align="right">{row.title}</CustomTableCell>
                    <CustomTableCell align="right">{row.artist}</CustomTableCell>
                    <CustomTableCell align="right">{row.duration}</CustomTableCell>
                    <CustomTableCell align="right">Add To Queue</CustomTableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          </div>
    );
}

// We need an intermediary variable for handling the recursive nesting.
const SearchResults = withStyles(styles)(Modal);

function mapStateToProps(state) {
    return {
        searchResults: state.searchResults
    }
  }
  
export default connect(mapStateToProps)(SearchResults);