import { JOIN_SESSION, DISCONNECTED, QUEUE_UPDATED, SEARCH, SHOW_MODAL } from './redux/actionTypes';
import convert from 'xml-js'; 
import { getQueueFromXmlResponse, getListFromXmlResponse } from './karafunXml';
import { MODAL_SEARCH } from './constants';

let websocket;
export function initializeWebSocket(dispatch, ip) {
    
    // Websockets!
    try {
        websocket = new WebSocket('ws://' + ip + ':57570');
    
        websocket.onmessage = message => {
            let response = convert.xml2js(message.data, {compact: true});
            console.log(response);

            if (response.status && response.status.queue) {
                let queue = getQueueFromXmlResponse(response.status.queue);
                dispatch({
                    type: QUEUE_UPDATED,
                    payload: queue
                })
            }

            if (response.list) {
                let list = getListFromXmlResponse(response.list);
                dispatch({
                    type: SEARCH,
                    payload: list
                })
                
                // Show the modal results
                dispatch({
                    type: SHOW_MODAL,
                    payload: MODAL_SEARCH
                })
            }
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
    if (websocket) websocket.send(message);
}