import React, { createContext, useReducer, useRef, useState } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  nickname: '',
  gameId: '',
  zPositions: {
    diamond: 150000,
    pawn: 100000,
    item: 50000,
    tile: 0,
  },
  players: [],
  availableColors: ['#47cf31', '#0c81f2', '#d2952b', '#808080'],
  hostConnections: [],
  clientConnection: {},
};

export const GlobalContext = createContext(initialState);

// Provider component provides actions for other components to use
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [gameObjects, setGameObjects] = useState({});

  // Action dispatchers
  function setNickname(nickname) {
    dispatch({
      type: 'SET_NICKNAME',
      payload: nickname,
    });
  }

  function setZPositions(zPositions) {
    dispatch({
      type: 'SET_Z_POSITIONS',
      payload: zPositions,
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

  function addHostConnection(connection) {
    dispatch({
      type: 'ADD_HOST_CONNECTION',
      payload: connection,
    });
  }

  function setClientConnection(connection) {
    dispatch({
      type: 'SET_CLIENT_CONNECTION',
      payload: connection,
    });
  }

  // TODO deleteConnection, deletePlayer (wyjebac clearPlayers)

  return (
    <GlobalContext.Provider
      value={{
        // This allows acces to global state and its actions from any component we request from useContext hook
        nickname: state.nickname,
        hostPeer: state.hostPeer,
        players: state.players,
        zPositions: state.zPositions,
        gameObjects: gameObjects,
        availableColors: state.availableColors,
        hostConnections: state.hostConnections,
        clientConnection: state.clientConnection,
        setNickname,
        addPlayer,
        clearPlayers,
        setPlayers,
        addHostConnection,
        setClientConnection,
        setZPositions,
        setGameObjects,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
