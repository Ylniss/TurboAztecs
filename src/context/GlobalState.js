import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  nickname: '',
  peerId: '',
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
  hostConnections: [],
  clientConnection: null,
};

export const GlobalContext = createContext(initialState);

// Provider component provides actions for other components to use
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Action dispatchers
  function setNickname(nickname) {
    dispatch({
      type: 'SET_NICKNAME',
      payload: nickname,
    });
  }

  function setPeerId(peerId) {
    dispatch({
      type: 'SET_PEER_ID',
      payload: peerId,
    });
  }

  function setZPositions(zPositions) {
    dispatch({
      type: 'SET_Z_POSITIONS',
      payload: zPositions,
    });
  }

  function addGameObject(gameObject) {
    dispatch({
      type: 'ADD_GAMEOBJECT',
      payload: gameObject,
    });
  }

  function removeGameObject(id) {
    dispatch({
      type: 'REMOVE_GAMEOBJECT',
      payload: id,
    });
  }

  function updateGameObjects(gameObject) {
    dispatch({
      type: 'UPDATE_GAMEOBJECTS',
      payload: gameObject,
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

  function updatePlayer(player) {
    dispatch({
      type: 'UPDATE_PLAYER',
      payload: player,
    });
  }

  // TODO deleteConnection, deletePlayer (wyjebac clearPlayers)

  return (
    <GlobalContext.Provider
      value={{
        // This allows acces to global state and its actions from any component we request from useContext hook
        nickname: state.nickname,
        peerId: state.peerId,
        hostPeer: state.hostPeer,
        players: state.players,
        zPositions: state.zPositions,
        gameObjects: state.gameObjects,
        availableColors: state.availableColors,
        hostConnections: state.hostConnections,
        clientConnection: state.clientConnection,
        setNickname,
        setPeerId,
        addPlayer,
        clearPlayers,
        setPlayers,
        addHostConnection,
        setClientConnection,
        setZPositions,
        addGameObject,
        removeGameObject,
        updateGameObjects,
        updatePlayer,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
