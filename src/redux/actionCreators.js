import {initializeWebSocket, sendMessage, closeWebSocket } from '../websocket';
import { JOIN_IP_CHANGED, SINGER_NAME_CHANGED, SEARCH_TERM_CHANGED, HIDE_MODAL, SONG_SELECTED } from './actionTypes';

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
    return () => {
        sendMessage('<action type="search" offset="{offset}" limit="{limit}">' + term + '</action>')
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
    return () => {
        singer = singer.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&apos;');
        sendMessage('<action type="addToQueue" song="' + id + '" singer="' + singer + '" >99999</action>')
    }
}

export function selectSong(id) {
    return {
        type: SONG_SELECTED,
        payload: id
    }
}

export function playerControlPlay() {
    return () => {
        sendMessage('<action type="play"></action>')
    }
}

export function playerControlPause() {
    return () => {
        sendMessage('<action type="pause"></action>')
    }
}

export function playerControlNext() {
    return () => {
        sendMessage('<action type="next"></action>')
    }
}