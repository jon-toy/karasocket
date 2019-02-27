import React from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { joinSession, joinIpChanged, leaveSession, singerNameChanged } from '../redux/actionCreators';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    fields: {
      textAlign: 'center',
      width: '100%'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    button: {
      margin: theme.spacing.unit,
    },
    status: {
      width: '100%'
    },
  });
  

class ConnectSession extends React.Component {
    render() {
        const { classes } = this.props;

        let button;
        if (this.props.connected) {
            button = (
                <Button variant="contained" color="primary" className={classes.button} onClick={() =>  {
                    this.props.leaveSession(this.props.sessionIp)
                }}>
                    Disconnect
                </Button>
            );
        }
        else {
            button = (
                <Button variant="contained" color="primary" className={classes.button} onClick={() =>  {
                    this.props.joinSession(this.props.sessionIp)
                }}>
                    Connect
                </Button> 
            );
        }
        
        return (
            <Paper>
                <div className={classes.container}>
                    <div className={classes.status}>
                        <Typography variant="h6" align="center">
                            Status: <span>{this.props.connected ? "Connected" : "Disconnected"}</span>
                        </Typography>
                    </div>
                    <div className={classes.fields}>
                    <TextField
                        label="Singer Name"
                        className={classes.textField}
                        value={this.props.singerName}
                        onChange={event => this.props.singerNameChanged(event.target.value)}
                        margin="normal"
                        >
                        </TextField>
                        <TextField
                        label="IP Address"
                        className={classes.textField}
                        value={this.props.sessionIp}
                        onChange={event => this.props.joinIpChanged(event.target.value)}
                        margin="normal"
                        >
                        </TextField>
                        {button}
                    </div>
                    
                </div>
            </Paper>
        );
    }
}

function mapStateToProps(state) {
    return {
        sessionIp: state.sessionIp,
        connected: state.connected
    };
  }

function mapDispatchToProps(dispatch) {
    return {
      joinSession: (ip) => dispatch(joinSession(ip)),
      joinIpChanged: (ip) => dispatch(joinIpChanged(ip)),
      singerNameChanged: (name) => dispatch(singerNameChanged(name)),
      leaveSession: () => dispatch(leaveSession())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ConnectSession));