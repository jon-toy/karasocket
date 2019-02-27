import { QUEUE_UPDATED, JOIN_IP_CHANGED, SINGER_NAME_CHANGED, JOIN_SESSION, DISCONNECTED } from "./actionTypes";
  
  export default function Reducer(state = {}, action = {}) {
  
    switch (action.type) {
      case QUEUE_UPDATED:
        const queue = action.payload;
        return { ...state, queue };
      case JOIN_IP_CHANGED:
        const sessionIp = action.payload;
        return { ...state, sessionIp};
      case SINGER_NAME_CHANGED:
        const singerName = action.payload;
        return { ...state, singerName }
      case JOIN_SESSION:
        return { ...state , connected: true }
      case DISCONNECTED:
        return { ...state, connected: false }
      default:
        return state;
    }
  }
  