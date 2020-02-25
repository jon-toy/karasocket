import {initializeWebSocket, sendMessage, closeWebSocket } from '../websocket';
import { 
    JOIN_IP_CHANGED, 
    SINGER_NAME_CHANGED, 
    SEARCH_TERM_CHANGED, 
    HIDE_MODAL, 
    SONG_SELECTED,
    SINGER_COLOR_CHANGED } from './actionTypes';

export function joinIpChanged(ip) {
    return {
        type: JOIN_IP_CHANGED,
        payload: ip
    }
}

export function singerNameChanged(name) {
    return {
        type: SINGER_NAME_CHANGED,
        payload: name
    }
}

export function singerColorChanged(color) {
    return {
        type: SINGER_COLOR_CHANGED,
        payload: color
    }
}

export function joinSession(ip) {
    return (dispatch) => {
      initializeWebSocket(dispatch, ip);
    };
}  

export function leaveSession() {
    return (dispatch) => {
      closeWebSocket(dispatch);
    };
}  

export function searchTermChanged(term) {
    return {
        type: SEARCH_TERM_CHANGED,
        payload: term
    }
}

export function hideModal() {
    return {
        type: HIDE_MODAL
    }
}

export function selectSong(id) {
    return {
        type: SONG_SELECTED,
        payload: id
    }
}

export function doSearch(term) {
    return (dispatch) => {
        sendMessage('<action type="search" offset="{offset}" limit="{limit}">' + term + '</action>', dispatch)
    };
}

/**
 * Makes a generic action call to KaraFun
 * @param {*} type play, pause, seek, next, pitch, tempo
 * @param {*} value Can be left blank
 */
function genericAction(type, value) {
    return (dispatch) => {
        sendMessage('<action type="' + type + '">' + (value !== null ? value : '') + '</action>', dispatch)
    }
}

// Player Controls

export function playerControlPlay() {
    return genericAction('play');
}

export function playerControlPause() {
    return genericAction('pause');
}

export function playerControlNext() {
    return genericAction('next');
} 

export function playerControlSeek(value) {
    return genericAction('seek', value);
} 

export function playerControlPitch(value) {
    return genericAction('pitch', value);
} 

export function playerControlTempo(value) {
    return genericAction('tempo', value);
} 

// Queue Management

export function queueClear() {
    return genericAction('clearQueue')
}

// TODO Remove this later (not now to avoid merge conflicts)
export function addToQueue(id, singer) {
    return queueAdd(id, singer);
}

export function queueAdd(id, singer) {
    return (dispatch) => {
        singer = singer.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&apos;');
        sendMessage('<action type="addToQueue" song="' + id + '" singer="' + singer + '" >99999</action>', dispatch)

        dispatch(searchTermChanged(''));
    }
}

export function queueRemove(index) {
    return (dispatch) => {
        sendMessage('<action type="removeFromQueue" id="' + index + '"></action>', dispatch)
    }
}

export function queueChangePosition(oldIndex, newIndex) {
    return (dispatch) => {
        sendMessage('<action type="changeQueuePosition" id="' + oldIndex + '">' + newIndex + '</action>', dispatch)
    }
}

// Volume Controls

function setVolume(volumeType, value) {
    return (dispatch) => {
        sendMessage('<action type="setVolume" volume_type="' + volumeType + '">' + value + '</action>', dispatch)
    }
}

export function setVolumeGeneral(value) {
    return setVolume('general', value);
}

export function setVolumeBackgroundVocals(value) {
    return setVolume('bv', value);
}

export function setVolumeLead(value) {
    return setVolume('lead1', value);
}

export function setVolumeLead2(value) {
    return setVolume('lead2', value);
}

export function magicButton() {
    return playerControlTempo(10);
}
