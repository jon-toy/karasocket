import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
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

function QueueTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Typography variant="h6" align="center">
        Current Queue
      </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>#</CustomTableCell>
            <CustomTableCell align="right">Singer</CustomTableCell>
            <CustomTableCell align="right">Song</CustomTableCell>
            <CustomTableCell align="right">Artist</CustomTableCell>
            <CustomTableCell align="right">Duration</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.queue.map((row, index) => (
            <TableRow className={classes.row} key={index}>
              <CustomTableCell component="th" scope="row">
                {index+1}
              </CustomTableCell>
              <CustomTableCell align="right">{row.singer}</CustomTableCell>
              <CustomTableCell align="right">{row.title}</CustomTableCell>
              <CustomTableCell align="right">{row.artist}</CustomTableCell>
              <CustomTableCell align="right">{row.duration}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

QueueTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        queue: state.queue
    }
  }
  
  export default connect(mapStateToProps)(withStyles(styles)(QueueTable))