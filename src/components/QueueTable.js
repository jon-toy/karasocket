import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  card: {
    display: 'flex',
    overflowX: 'scroll'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    textAlign: 'center'
  },
  content: {
    flex: '1 0 auto',
  },
  table: {
    
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
    <Card className={classes.card}>
        
      <div className={classes.details}>
        <CardHeader
            title="Current Queue"
        />
        <div className={classes.cardContent}>
          <CardContent className={classes.content}>
          <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell align="left">Singer</CustomTableCell>
              <CustomTableCell align="left">Song</CustomTableCell>
              <CustomTableCell align="left">Artist</CustomTableCell>
              <CustomTableCell align="left">Duration</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.queue.map((row, index) => (
              <TableRow className={classes.row} key={index}>
                <CustomTableCell align="left">{row.singer}</CustomTableCell>
                <CustomTableCell align="left">{row.title}</CustomTableCell>
                <CustomTableCell align="left">{row.artist}</CustomTableCell>
                <CustomTableCell align="left">{row.duration}</CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
          </CardContent>
        </div>
      </div>
    </Card>
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