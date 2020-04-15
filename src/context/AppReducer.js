// Reducer specifies state changes logic
export default (state, action) => {
  switch (action.type) {
    case 'SET_NICKNAME':
      return {
        ...state,
        nickname: action.payload,
      };
    case 'ADD_PLAYER':
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
    default:
      return state;
  }
};
