// Reducer specifies state changes logic
export default (state, action) => {
  switch (action.type) {
    case 'SET_NICKNAME':
      return {
        ...state,
        nickname: action.payload,
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
    case 'ADD_CONNECTION':
      return {
        ...state,
        connections: [...state.connections, action.payload],
      };
    case 'UPDATE_PLAYER':
      return {
        ...state,
        players: state.players.map(player =>
          player.peerId === action.payload.peerId ? action.payload : player
        ),
      };
    case 'SET_PEER':
      return {
        ...state,
        peer: action.payload,
      };
    default:
      return state;
  }
};
