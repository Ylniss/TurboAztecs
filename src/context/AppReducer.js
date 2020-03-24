// Reducer specifies state changes logic
export default (state, action) => {
  switch (action.type) {
    case 'set_nickname':
      return {
        ...state, 
        nickname: state.nickname
      };
    case 'set_gameId':
      return {
        ...state,
        gameId: state.gameId
      };
    default:
      return state;
  }
};
