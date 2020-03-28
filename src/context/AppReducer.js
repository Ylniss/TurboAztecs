// Reducer specifies state changes logic
export default (state, action) => {
  switch (action.type) {
    case 'SET_NICKNAME':
      return {
        ...state, 
        nickname: action.payload
      }
    case 'SET_HOSTPEER':
      return {
        ...state,
        hostPeer: action.payload
      }
    case 'ADD_PLAYER':
      return {
        ...state,
        players: [...state.players, action.payload]
      }
    default:
      return state;
  }
}