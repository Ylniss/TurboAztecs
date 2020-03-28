import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
    nickname: '',
    hostPeer: {},
    players: [],
    availableColors: ["#ff0000", "#00ff00", "#ffff00", "#0000ff"]
}

export const GlobalContext = createContext(initialState);

// Provider component provides actions for other components to use
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Action dispatchers
    function setNickname(nickname) {
        dispatch({
            type: 'SET_NICKNAME',
            payload: nickname
        });
    }

    function setHostPeer(hostPeer) {
        dispatch({
            type: 'SET_HOSTPEER',
            payload: hostPeer
        });
    }

    function addPlayer(player) {
        dispatch({
            type: 'ADD_PLAYER',
            payload: player
        });
    }

    return (
        <GlobalContext.Provider value={{
            // This allows acces to global state and its actions from any component we request from useContext hook
            nickname: state.nickname,
            hostPeer: state.hostPeer,
            players: state.players,
            availableColors: state.availableColors,
            setNickname,
            setHostPeer,
            addPlayer
        }}>
            { children }
        </GlobalContext.Provider>
    )
}