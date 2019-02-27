import {initializeWebSocket, sendMessage, closeWebSocket } from '../websocket';
import { JOIN_IP_CHANGED, SEARCH , SINGER_NAME_CHANGED} from './actionTypes';

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

export function search(term) {
    
    sendMessage('<action type="search" offset="{offset}" limit="{limit}">' + term + '</action>');

    return {
        type: SEARCH,
        payload: {data:"Hiyo"}
    };
}