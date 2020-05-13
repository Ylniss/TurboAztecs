import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  nickname: '',
  gameId: '',
  zPositions: [
    //needed for layering objects on screen properly
    { type: 'diamond', z: 150000 },
    { type: 'pawn', z: 100000 },
    { type: 'item', z: 50000 },
    { type: 'tile', z: 0 },
  ],
  gameObjects: [],
  players: [],
  availableColors: ['#47cf31', '#0c81f2', '#d2952b', '#808080'],
  peer: null,
};

export const GlobalContext = createContext(initialState);

// Provider component provides actions for other components to use
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Action dispatchers
  // zmianka na arrow functions?
  function setNickname(nickname) {
    dispatch({
      type: 'SET_NICKNAME',
      payload: nickname,
    });
  }

  function addPlayer(player) {
    dispatch({
      type: 'ADD_PLAYER',
      payload: player,
    });
  }

  function clearPlayers() {
    dispatch({
      type: 'CLEAR_PLAYERS',
    });
  }

  function setPlayers(players) {
    dispatch({
      type: 'SET_PLAYERS',
      payload: players,
    });
  }

  function updatePlayer(player) {
    dispatch({
      type: 'UPDATE_PLAYER',
      payload: player,
    });
  }

  function deletePlayer(player) {
    dispatch({
      type: 'DELETE_PLAYER',
      payload: player,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        // This allows acces to global state and its actions from any component we request from useContext hook
        nickname: state.nickname,
        hostPeer: state.hostPeer,
        players: state.players,
        setNickname,
        addPlayer,
        clearPlayers,
        setPlayers,
        updatePlayer,
        deletePlayer,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
