import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
    nickname: '',
    gameId: ''
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component provides actions for other components to use
// CR: jak było export default function to nie działało
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
            setNickname,
            setGameId
        }}>
            { children }
        </GlobalContext.Provider>
    )
}