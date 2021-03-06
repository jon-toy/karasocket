const defaultState = {
  singerName: localStorage.getItem("singerName"),
  sessionIp: "68.231.71.239",
  connected: false,
  reconnecting: false,
  currentSong: {},
  searchTerm: "",
  queue: [],
  modalShow: false,
  modalContent: null,
  searchResults: [],
  selectedSong: null,
  nowPlaying: null,
  upNext: null,
  playerState: 'idle',
  singerColor: '#e91e63'
};

export default defaultState;
