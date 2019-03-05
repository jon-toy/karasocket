import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SingerAvatar from './SingerAvatar';
import PlayerControls from './PlayerControls';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

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
  cardContent: {

  },
  cardContentNada: {
    opacity: .5
  },
});

function PlayerCard(props) {
  const { classes, song, defaultTitle, defaultSinger, defaultArtist, showControls, title } = props;

  let content = (
    <div className={classes.cardContentNada}>
        <SingerAvatar song={song}/>
        <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
                {defaultTitle}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                {defaultArtist}
            </Typography>
            <Typography variant="subtitle2" color="textPrimary">
                {defaultSinger}
            </Typography>
        </CardContent>
    </div>
  );
  if (song && song.status !== 'loading') {
    content = (
    <div className={classes.cardContent}>
        <SingerAvatar song={song}/>
        <CardContent className={classes.content}>
             <Typography component="h5" variant="h5">
                {song.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                {song.artist}
            </Typography>
            <Typography variant="subtitle2" color="textPrimary">
                Sung By {song.singer}
            </Typography>
        </CardContent>
    </div>
      );
  }

  return (
    <Card className={classes.card}>
        
      <div className={classes.details}>
        <CardHeader
            title={title}
        />
        {content}
        {showControls ?  <PlayerControls/> : <PlayerControls visible={false}/>}
      </div>
    </Card>
    
  );
}

PlayerCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PlayerCard)