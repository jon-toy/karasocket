import { JOIN_SESSION, DISCONNECTED, QUEUE_UPDATED, SEARCH, SHOW_MODAL, PLAYER_STATE_UPDATED, RECONNECTING } from './redux/actionTypes';
import { hideModal } from './redux/actionCreators';
import convert from 'xml-js'; 
import { getQueueFromXmlResponse, getListFromXmlResponse } from './karafunXml';
import { MODAL_SEARCH } from './constants';

let websocket;
export function initializeWebSocket(dispatch, ip) {
    
    // Websockets!
    try {
        websocket = new WebSocket('ws://' + ip + ':57570');

        // Attempt to reconnect after the socket dies
        websocket.onclose = e => {
            console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
            dispatch({
                type: RECONNECTING
            });

            setTimeout(function() {
              initializeWebSocket(dispatch, ip);
            }, 1000);
          };
    
        websocket.onmessage = message => {
            let response = convert.xml2js(message.data, {compact: true});
            //console.log(response);

            if (response.status && response.status.queue) {
                let queue = getQueueFromXmlResponse(response.status.queue);
                dispatch({
                    type: QUEUE_UPDATED,
                    payload: queue
                })

                dispatch(hideModal());
            }

            if (response.status && response.status._attributes.state) {
                dispatch ({
                    type: PLAYER_STATE_UPDATED,
                    payload: response.status._attributes.state
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

            dispatch({
                type: JOIN_SESSION
            }); 
        }; 
    }
    catch(err) {
        console.log(err);
        dispatch({
            type: DISCONNECTED
        });
    }
}

export function closeWebSocket(dispatch) {
    if (websocket) {
        websocket.onclose = e => {}
        websocket.close();
    }
    dispatch({
        type: DISCONNECTED
    });
}

export function sendMessage(message, dispatch) {
    if (websocket) 
        websocket.send(message);
    else 
        closeWebSocket(dispatch);
}