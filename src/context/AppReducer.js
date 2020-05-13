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
    case 'UPDATE_PLAYER':
      return {
        ...state,
        clientConnection: action.payload,
      };
    case 'CLEAR_HOST_CONNECTIONS':
      return {
        ...state,
        hostConnections: [],
      };
    case 'SET_Z_POSITIONS':
      return {
        ...state,
        zPositions: action.payload,
      };
    case 'ADD_GAMEOBJECT':
      return {
        ...state,
        gameObjects: [...state.gameObjects, action.payload],
      };
    case 'UPDATE_GAMEOBJECTS':
      return {
        ...state,
        gameObjects: state.gameObjects.map(gameObj =>
          gameObj.id === action.payload.id ? action.payload : gameObj
        ),
      };
    case 'DELETE_PLAYER':
      return {
        ...state,
        players: state.players.filter((player) => { return player !== action.payload })
      }
    default:
      return state;
  }
};
