// Reducer specifies state changes logic
export default (state, action) => {
  switch (action.type) {
    case 'SET_NICKNAME':
      return {
        ...state,
        nickname: action.payload,
      };
    case 'SET_PEER_ID':
      return {
        ...state,
        peerId: action.payload,
      };
    case 'ADD_PLAYER':
      const usedColors = state.players.map(player => player.color);
      action.payload.color = state.availableColors.find(color => !usedColors.includes(color));

      return {
        ...state,
        players: [...state.players, action.payload],
      };
    case 'CLEAR_PLAYERS':
      return {
        ...state,
        players: [],
      };
    case 'SET_PLAYERS':
      return {
        ...state,
        players: action.payload,
      };
    case 'ADD_HOST_CONNECTION':
      return {
        ...state,
        hostConnections: [...state.hostConnections, action.payload],
      };
    case 'SET_CLIENT_CONNECTION':
      return {
        ...state,
        clientConnection: action.payload,
      };
    case 'UPDATE_PLAYER':
      return {
        ...state,
        players: state.players.map(player =>
          player.peerId === action.payload.peerId ? action.payload : player
        ),
      };
    default:
      return state;
  }
};
