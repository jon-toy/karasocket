import { 
  QUEUE_UPDATED, 
  JOIN_IP_CHANGED, 
  SINGER_NAME_CHANGED, 
  JOIN_SESSION, 
  DISCONNECTED, 
  SEARCH_TERM_CHANGED, 
  SEARCH, 
  SHOW_MODAL,
  HIDE_MODAL,
  SONG_SELECTED
} from "./actionTypes";
  
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
      case SEARCH_TERM_CHANGED:
        const searchTerm = action.payload;
        return { ...state, searchTerm }
      case JOIN_SESSION:
        return { ...state , connected: true }
      case DISCONNECTED:
        return { ...state, connected: false, searchResults: [], queue: [] }
      case SEARCH:
        const searchResults = action.payload;
        return { ...state, searchResults }
      case SHOW_MODAL: 
        const modalContent = action.payload;
        return { ...state, modalShow: true, modalContent }
      case HIDE_MODAL:
        return { ...state, modalShow: false }
      case SONG_SELECTED:
        const selectedSong = action.payload;
        return { ...state, selectedSong }
      default:
        return state;
    }
  }
  