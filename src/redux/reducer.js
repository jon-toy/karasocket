import { 
  QUEUE_UPDATED, 
  JOIN_IP_CHANGED, 
  SINGER_NAME_CHANGED, 
  SINGER_COLOR_CHANGED,
  JOIN_SESSION, 
  DISCONNECTED, 
  SEARCH_TERM_CHANGED, 
  SEARCH, 
  SHOW_MODAL,
  HIDE_MODAL,
  SONG_SELECTED,
  PLAYER_STATE_UPDATED
} from "./actionTypes";
  
  export default function Reducer(state = {}, action = {}) {
    switch (action.type) {
      case QUEUE_UPDATED:
        const queue = action.payload;
        let nowPlaying = state.nowPlaying;
        let upNext = state.upNext;
        if (queue.length > 0) {
          let first = queue[0];
          if (first.status === 'playing') {
            // Song in progress
            nowPlaying = first;

            if (queue.length > 1) 
              upNext = queue[1];
            else 
              upNext = null;
          }
          else if (first.status === 'ready') {
            nowPlaying = null;

            // No song playing
            upNext = first;
          }
          else if (first.status === 'loading') {
            nowPlaying = null;

            // No song playing
            upNext = first;
          }
        }
        else {
          nowPlaying = null;
          upNext = null;
        }
        return { ...state, queue, nowPlaying, upNext };
      case JOIN_IP_CHANGED:
        const sessionIp = action.payload;
        return { ...state, sessionIp};
      case SINGER_NAME_CHANGED:
        const singerName = action.payload;
        return { ...state, singerName }
      case SINGER_COLOR_CHANGED:
        const singerColor = action.payload;
        return { ...state, singerColor }
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
      case PLAYER_STATE_UPDATED: 
        const playerState = action.payload;
        return { ...state, playerState }
      default:
        return state;
    }
  }
  