import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  nickname: '',
  gameId: '',
  players: [
    {
      id: 1,
      nickname: 'Bakenszeftwagen',
      color: '#47cf31',
    },
    {
      id: 2,
      nickname: 'Zordiasz420',
      color: '#0c81f2',
    },
    {
      id: 3,
      nickname: 'Autism boiii',
      color: '#d2952b',
    },
    {
      id: 4,
      nickname: 'Bamboozlord',
      color: '#808080',
    },
  ],
  zPositions: [
    //needed for layering objects on screen properly
    { type: 'diamond', z: 150000 },
    { type: 'pawn', z: 100000 },
    { type: 'item', z: 50000 },
    { type: 'tile', z: 0 },
  ],
  gameObjects: [],
};

export const GlobalContext = createContext(initialState);

// Provider component provides actions for other components to use
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function setNickname(nickname) {
    dispatch({
      type: 'set_nickname',
      payload: nickname,
    });
  }

  function setGameId(gameId) {
    dispatch({
      type: 'set_gameId',
      payload: gameId,
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

  return (
    <GlobalContext.Provider
      value={{
        // This allows acces to global state and its actions from any component we request from useContext hook
        nickname: state.nickname,
        gameId: state.gameId,
        players: state.players, // todo: add addPlayer, removePlayer action dispatchers and actions in reducer
        zPositions: state.zPositions,
        gameObjects: state.gameObjects,
        setNickname,
        setGameId,
        setZPositions,
        addGameObject,
        removeGameObject,
        updateGameObjects,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
