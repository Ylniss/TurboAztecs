// Reducer specifies state changes logic
export default (state, action) => {
  switch (action.type) {
    case 'set_nickname':
      return {
        //   ...state, <- To tak chyba musi być, żeby nie usunąć gameId, bo reducer zawsze nadpisuje stan, ale nie jestem pewien
        nickname: state.nickname
      };
    case 'set_gameId':
      return {
        // ...state, <- j.w.
        gameId: state.gameId
      };
    case 'SET_Z_POSITIONS':
      return {
        ...state,
        zPositions: state.zPositions
      };
    case 'ADD_GAMEOBJECT':
      return {
        ...state,
        gameObjects: [...state.gameObjects, action.payload]
      };
    case 'UPDATE_GAMEOBJECT':
      return {
        ...state,
        gameObjects: state.gameObjects.map(gameObj => gameObj.id === action.payload.id ? action.payload : gameObj)
      };
    default:
      return state;
  }
};
