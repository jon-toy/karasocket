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
  cardContent: {
    
  },
  cardContentNada: {
    opacity: .5
  }
});

// TODO: Combine this with NowPlaying to make one big component when I'm not so time crunched
function UpNext(props) {
  const { classes, upNext, nowPlaying } = props;

  let content = (
    <div className={classes.cardContentNada}>
            <CardMedia
                className={classes.cover}
                image="/karafunlogo.png"
                title="Generic Album Logo"
            />
        <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
                {upNext && upNext.status === 'loading' ? 'Loading...' : 'Nothing coming up!'}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                &nbsp;
            </Typography>
            <Typography variant="subtitle2" color="textPrimary">
                {upNext && upNext.status === 'loading' ? '' : 'Add a Song!'}
            </Typography>
        </CardContent>
    </div>
  );
  if (upNext && upNext.status !== 'loading') {
    content = (
    <div className={classes.cardContent}>
        <CardMedia
            className={classes.cover}
            image="/karafunlogo.png"
            title="Generic Album Logo"
        />
        <CardContent className={classes.content}>
             <Typography component="h5" variant="h5">
                {upNext.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                {upNext.artist}
            </Typography>
            <Typography variant="subtitle2" color="textPrimary">
                Sung By {upNext.singer}
            </Typography>
        </CardContent>
    </div>
      );
  }

  return (
    <Card className={classes.card}>
        
      <div className={classes.details}>
        <CardHeader
            title="Up Next"
        />
        {content}
        {upNext && !nowPlaying ?  <PlayerControls/> : <PlayerControls visible={false}/>}
      </div>
    </Card>
  );
}

UpNext.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
      upNext: state.upNext,
      nowPlaying: state.nowPlaying
  }
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(UpNext))