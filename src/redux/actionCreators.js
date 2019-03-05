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

export function doSearch(term) {
    return (dispatch) => {
        sendMessage('<action type="search" offset="{offset}" limit="{limit}">' + term + '</action>', dispatch)
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

export function addToQueue(id, singer) {
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

export function selectSong(id) {
    return {
        type: SONG_SELECTED,
        payload: id
    }
}

export function playerControlPlay() {
    return (dispatch) => {
        sendMessage('<action type="play"></action>', dispatch)
    }
}

export function playerControlPause() {
    return (dispatch) => {
        sendMessage('<action type="pause"></action>', dispatch)
    }
}

export function playerControlNext() {
    return (dispatch) => {
        sendMessage('<action type="next"></action>', dispatch)
    }
}