import { addMessageType } from '../services/messageHelper';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const usePeerMessenger = () => {
  const { addPlayer, setPlayers } = useContext(GlobalContext);

  const sendMessage = (connection, messageType, messageData) => {
    const message = addMessageType(messageType, messageData);

    console.log('Sending message:');
    console.log(message);

    connection.send(message);
  };

  const receiveMessage = (message) => {
    switch (message.type) {
      case 'player':
        addPlayer(message.data);
        break;
      case 'players':
        setPlayers(message.data);
        break;
      case 'gameObjects':
        // setGameObjects(message.data);
        break;
      case 'diceRoll':
        // setDice(message.data);
        break;
      default:
        console.log(`Unknown message: ${message}`);
        break;
    }
  };

  return { sendMessage, receiveMessage };
};
