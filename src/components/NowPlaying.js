import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import { connect } from 'react-redux';
import PlayerControls from './PlayerControls';

const styles = theme => ({
  card: {
    display: 'flex',
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
  cover: {
    width: 151,
    height: 151,
    margin: 'auto'
  },
  controls: {
    visibility: 'hidden',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    justifyContent: 'center'
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  cardContent: {

  },
  cardContentNada: {
    opacity: .5
  },
});

function NowPlaying(props) {
  const { classes, nowPlaying } = props;

  let content = (
    <div className={classes.cardContentNada}>
            <CardMedia
                className={classes.cover}
                image="/karafunlogo.png"
                title="Generic Album Logo"
            />
        <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
                Nothing playing right now!
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                &nbsp;
            </Typography>
            <Typography variant="subtitle2" color="textPrimary">
                Hit Play or Add a Song!
            </Typography>
        </CardContent>
    </div>
  );
  if (nowPlaying) {
    content = (
    <div className={classes.cardContent}>
        <CardMedia
            className={classes.cover}
            image="/karafunlogo.png"
            title="Generic Album Logo"
        />
        <CardContent className={classes.content}>
             <Typography component="h5" variant="h5">
                {nowPlaying.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                {nowPlaying.artist}
            </Typography>
            <Typography variant="subtitle2" color="textPrimary">
                Sung By {nowPlaying.singer}
            </Typography>
        </CardContent>
    </div>
      );
  }

  return (
    <Card className={classes.card}>
        
      <div className={classes.details}>
        <CardHeader
            title="Now Playing"
        />
        {content}
        {nowPlaying ?  <PlayerControls/> : <PlayerControls visible={false}/>}
      </div>
    </Card>
  );
}

NowPlaying.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        nowPlaying: state.nowPlaying,
        playerState: state.playerState
    }
  }

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(NowPlaying))