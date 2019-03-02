import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { connect } from 'react-redux';
import { playerControlPlay, playerControlPause, playerControlNext } from '../redux/actionCreators'

const styles = theme => ({
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    justifyContent: 'center'
  },
  controlsNada: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    justifyContent: 'center',
    visibility: 'hidden'
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

function PlayerControls(props) {

  const { classes, playerState, playerControlPlay, playerControlPause, playerControlNext } = props;


  let playPauseButton = (
    <IconButton aria-label="Play/pause" disabled>
      <PlayArrowIcon className={classes.playIcon}/>
    </IconButton>
    );
  
  if (playerState === "idle" || playerState === "infoscreen") {
    playPauseButton = (
      <IconButton aria-label="Play/pause" onClick={() => playerControlPlay()}>
        <PlayArrowIcon className={classes.playIcon}/>
      </IconButton>
      );
  } else if (playerState === "playing") {
    playPauseButton = (
      <IconButton aria-label="Play/pause" onClick={() => playerControlPause()}>
        <PauseIcon className={classes.playIcon}/>
      </IconButton>
      );
  }

  let controlVisibilityClass = classes.controls;
  if (props.visible === false) controlVisibilityClass = classes.controlsNada; 

  return (
    <div className={controlVisibilityClass}>
        {playPauseButton}
        <IconButton aria-label="Next" onClick={() => playerControlNext()}>
            <SkipNextIcon/>
        </IconButton>
    </div>
  )
}

function mapStateToProps(state) {
    return {
        playerState: state.playerState
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      playerControlPlay: () => dispatch(playerControlPlay()),
      playerControlPause: () => dispatch(playerControlPause()),
      playerControlNext: () => dispatch(playerControlNext()),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(PlayerControls))