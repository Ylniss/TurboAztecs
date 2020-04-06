import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  nickname: '',
  players: [],
  availableColors: ['#ff0000', '#00ff00', '#ffff00', '#0000ff'],
  hostConnections: [],
  clientConnection: {},
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
        availableColors: state.availableColors,
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
