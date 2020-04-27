import React, { createContext, useReducer, useRef } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  // constants
  availableColors: ['#47cf31', '#0c81f2', '#d2952b', '#808080'],
  screenDefaults: { width: 1920, height: 1080, aspectRatio: 0.5625 },

  nickname: '',
  gameId: '',
  players: [],
  hostConnections: [],
  clientConnection: {},
};

export const GlobalContext = createContext(initialState);

// Provider component provides actions for other components to use
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const gameObjects = useRef({});
  const stacks = useRef({});
  const zPositions = useRef({
    diamond: 150000,
    pawn: 100000,
    item: 50000,
    tile: 1,
  });

  // Action dispatchers
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
        availableColors: state.availableColors,
        screenDefaults: state.screenDefaults,
        nickname: state.nickname,
        hostPeer: state.hostPeer,
        players: state.players,
        gameObjects: gameObjects.current,
        zPositions: zPositions.current,
        stacks: stacks.current,
        hostConnections: state.hostConnections,
        clientConnection: state.clientConnection,
        setNickname,
        addPlayer,
        clearPlayers,
        setPlayers,
        addHostConnection,
        setClientConnection,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
