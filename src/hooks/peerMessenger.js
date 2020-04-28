import { addMessageType } from '../services/messageHelper';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const usePeerMessenger = () => {
  const { addPlayer, updatePlayer, deletePlayer } = useContext(GlobalContext);

  const sendMessage = (connection, messageType, messageData) => {
    const message = addMessageType(messageType, messageData);

    console.log('Sending message:');
    console.log(message);

    connection.send(message);
  };

  const receiveMessage = message => {
    console.log('Received message: ');
    console.log(message);

    switch (message.type) {
      case 'ADD_PLAYER':
        addPlayer(message.data);
        break;
      case 'UPDATE_PLAYER':
        updatePlayer(message.data);
        break;
      // case 'SET_PLAYERS':
      //   setPlayers(message.data);
      //   break;
      case 'DELETE_PLAYER':
        deletePlayer(message.data);
        break;
      default:
        console.log('Message type unknown.');
        break;
    }
  };

  return { sendMessage, receiveMessage };
};
