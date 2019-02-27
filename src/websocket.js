import { JOIN_SESSION, DISCONNECTED, QUEUE_UPDATED } from './redux/actionTypes';
import convert from 'xml-js'; 
import { getQueueFromXmlResponse } from './karafunXml';

let websocket;
export function initializeWebSocket(dispatch, ip) {
    
    // Websockets!
    try {
        websocket = new WebSocket('ws://' + ip + ':57570');
    
        websocket.onmessage = message => {
            let queue = getQueueFromXmlResponse(convert.xml2js(message.data, {compact: true}));
            dispatch({
                type: QUEUE_UPDATED,
                payload: queue
            })
        };

        dispatch({
            type: JOIN_SESSION
        });  
    }
    catch(err) {
        console.log(err);
        dispatch({
            type: DISCONNECTED
        });
    }
    
}

export function closeWebSocket(dispatch) {
    if (websocket) websocket.close();
    dispatch({
        type: DISCONNECTED
    });
}

export function sendMessage(message) {
    websocket.send(message);
}

function parseResponse(response) {
    // Do a switch statement here based on the response type (Status, list, etc). Then dispatch state accordingly

}