import React, { createContext, useReducer, useRef } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  // constants
  availableColors: ['#47cf31', '#0c81f2', '#d2952b', '#808080'],
  screenDefaults: { width: 1920, height: 1080, aspectRatio: 0.5625 },
  nickname: '',
  gameId: '',
  players: [],
  connections: [],
  peer: {},
};

export const GlobalContext = createContext(initialState);

// Provider component provides actions for other components to use
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const gameObjects = useRef({});
  const zPositions = useRef({
    diamond: 150000,
    pawn: 100000,
    item: 50000,
    tile: 0,
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

  function addConnection(connection) {
    dispatch({
      type: 'ADD_HOST_CONNECTION',
      payload: connection,
    });
  }

  function updatePlayer(player) {
    dispatch({
      type: 'UPDATE_PLAYER',
      payload: player,
    });
  }

  function setPeer(peer) {
    dispatch({
      type: 'SET_PEER',
      payload: peer,
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
        peer: state.peer,
        players: state.players,
        gameObjects: gameObjects.current,
        zPositions: zPositions.current,
        connections: state.connections,
        setNickname,
        addPlayer,
        clearPlayers,
        setPlayers,
        addConnection,
        updatePlayer,
        setPeer,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
