import React from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import { connect } from 'react-redux';
import { joinSession, joinIpChanged, leaveSession, singerNameChanged } from '../redux/actionCreators';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

const disconnected = grey['200'];

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    fields: {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      width: '100%',
      padding: '0 0 20px 0'
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
      width: '100%',
      backgroundColor: disconnected,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 0,
      paddingRight: 0
    },
    titleText: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit
    },
    panel: {
        width: '100%'
    }
  });
  

class ConnectSession extends React.Component {
    state = {
        expanded: true,
        singerNameError: false,
        ipAddressError: false
      };

    handleChange = () => {
        this.setState({
            expanded: !this.state.expanded
        });
    };

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
                    if (this.props.sessionIp && this.props.singerName && this.props.sessionIp.length > 0 && this.props.singerName.length > 0) {
                        this.props.joinSession(this.props.sessionIp)
                        this.setState({
                            expanded: false
                        });
                    }
                        
                    else {
                        this.setState({
                            expanded: true,
                            singerNameError: true,
                            ipAddressError: true
                        });
                    }
                }}>
                    Connect
                </Button> 
            );
        }
        
        return (
            <div className={classes.container}>
                <ExpansionPanel className={classes.panel} expanded={this.state.expanded}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} className={classes.status} onClick={this.handleChange}>
                        <Typography className={classes.titleText} variant="subtitle2" align="center">{this.props.connected ? "Connected as " + this.props.singerName : "Status: Disconnected"}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.fields}>
                      <Grid container alignItems="center">
                      {this.props.connected ? '' : <Grid item xs={12} sm={6} md={5}>
                         <TextField
                              label="Singer Name"
                              className={classes.textField}
                              value={this.props.singerName}
                              onChange={event => this.props.singerNameChanged(event.target.value)}
                              margin="normal"
                              required={true}
                              error={this.state.singerNameError}
                          />
                        </Grid>}
                        {this.props.connected ? '' : <Grid item xs={12} sm={6} md={5}>
                          <TextField
                              label="IP Address"
                              className={classes.textField}
                              value={this.props.sessionIp}
                              onChange={event => this.props.joinIpChanged(event.target.value)}
                              margin="normal"
                              required={true}
                              error={this.state.ipAddressError}
                          />
                        </Grid>}
                        <Grid item xs={12} sm={12} md={2}>
                          {button}
                        </Grid>
                      </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        sessionIp: state.sessionIp,
        connected: state.connected,
        singerName: state.singerName
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