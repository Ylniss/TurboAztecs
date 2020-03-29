import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
    nickname: '',
    gameId: '',
    players: [
        {
          id: 1,
          nickname: "Bakenszeftwagen",
          color: "#47cf31"
        },
        {
          id: 2,
          nickname: "Zordiasz420",
          color: "#0c81f2"
        },
        {
          id: 3,
          nickname: "Autism boiii",
          color: "#d2952b"
        },
        {
          id: 4,
          nickname: "Bamboozlord",
          color: "#808080"
        }
    ]
}

export const GlobalContext = createContext(initialState);

// Provider component provides actions for other components to use
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    function setNickname(nickname) {
        dispatch({
            type: 'set_nickname',
            payload: nickname
        })
    }

    function setGameId(gameId) {
        dispatch({
            type: 'set_gameId',
            payload: gameId
        })
    }

    return (
        <GlobalContext.Provider value={{
            // This allows acces to global state and its actions from any component we request from useContext hook
            nickname: state.nickname,
            gameId: state.gameId,
            players: state.players, // todo: add addPlayer, removePlayer action dispatchers and actions in reducer
            setNickname,
            setGameId
        }}>
            { children }
        </GlobalContext.Provider>
    )
}