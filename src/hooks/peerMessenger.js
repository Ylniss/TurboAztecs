import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { usePeer } from './peer';

export const usePeerMessenger = () => {
  const { addPlayer, updatePlayer, deletePlayer, connections, peer } = useContext(GlobalContext);
  const { connect } = usePeer();

  const sendMessage = (connection, messageType, messageData) => {
    const message = { data: messageData, type: messageType };

    console.log('Sending message:');
    console.log(message);

    connection.send(message);
  };

  const receiveMessage = message => {
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
      case 'CONNECT':
        connect(peer, message.data);
        break;
      default:
        console.log(`Unknown message: ${message}`);
        break;
    }
  };

  return { sendMessage, receiveMessage };
};
