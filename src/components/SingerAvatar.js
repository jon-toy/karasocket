import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    panel: {
        width: '100%'
    },
    coverYou: {
        width: 151,
        height: 151,
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        background: theme.palette.primary.light,
    },
    coverNotYou: {
        width: 151,
        height: 151,
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        background: theme.palette.secondary.dark,
    },
    letter: {
        color: '#FFF'
    }
  });
  

  
function SingerAvatar(props) {
    const { classes, song, singerName } = props;

    let cover = classes.coverNotYou;
    if (song && song.singer === singerName ) 
        cover = classes.coverYou

    return (
        <div className={cover}>
            <Typography variant="h1" className={classes.letter}>
                {song && song.singer && song.singer.length > 0 ? song.singer.charAt(0).toUpperCase() : '♪'}
            </Typography>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        singerName: state.singerName,
        singerColor: state.singerColor
    }
  }
  
  export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(SingerAvatar))