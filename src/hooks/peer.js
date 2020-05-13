/* eslint-disable react-hooks/exhaustive-deps */
import Peer from 'peerjs';
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useHistory } from 'react-router-dom';

// peerjs --port 9000 --key peerjs

export const usePeer = (initialPeer) => {
  const [peer, setPeer] = useState(initialPeer);
  const { nickname, addPlayer, deletePlayer, updatePlayer } = useContext(
    GlobalContext
  );
  const history = useHistory();

  useEffect(() => {
    if (!peer || peer !== initialPeer) {
      return;
    }

    peer.on('connection', connection => {
      console.log(`Connected to: ${connection.peer}`);

      connection.on('open', () => {
        console.log(`Connection opened with: ${connection.peer}`);

        const player = {
          peerId: peer.id,
          nickname,
        };

        sendMessage(connection, 'ADD_PLAYER', player);

        // const colorsLeft = availableColors.filter(color => ) // wysyłanie update_player z kolorem dostepnym

        const connections = getConnections(peer);
        connections.forEach(conn => {
          sendMessage(connection, 'CONNECT', conn.peer);
        });
      });

      connection.on('data', message => {
        receiveMessage(message);
      });
    });

    peer.on('disconnected', () => {
      console.log('Peer disconnected.');
      peer.destroy();
    });

    peer.on('close', () => {
      console.log('Peer closed.');
      peer.destroy();
    });

    peer.on('error', error => {
      history.push('/main');
      console.log(error);
    });

    console.log(`Listeners set for peer ${peer.id}`);
  }, [peer]);

  const createPeer = () => {
    return new Promise((resolve, reject) => {
      const newPeer = new Peer(null, { key: 'peerjs', debug: 2 });

      newPeer.on('open', id => {
        console.log(`Opened peer with id: ${id}`);
        setPeer(newPeer);

        if (newPeer) {
          resolve(newPeer);
        } else {
          console.log('Error occured when creating peer');
          reject();
        }
      });
    });
  };

  const connect = (peer, hostId) => {
    return new Promise(() => {
      const connection = peer.connect(hostId, { serialization: 'json' });

      connection.on('open', () => {
        console.log(`Connection opened with: ${connection.peer}`);

        connection.on('data', data => {
          receiveMessage(data);
        });

        const player = {
          peerId: peer.id,
          nickname,
        };

        sendMessage(connection, 'ADD_PLAYER', player);
      });
    });
  };

  const sendMessage = (connection, messageType, messageData) => {
    const message = { data: messageData, type: messageType };

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
      case 'CONNECT':
        const connections = getConnections(peer);
        if (connections.every(conn => conn.peer !== message.data && peer.id !== message.data)) {
          connect(peer, message.data);
        }
        break;
      case 'CLOSE_CONNECTION':
        break;
      default:
        console.log('Message type unknown.');
        break;
    }
  };

  const clearPeer = peer => {
    // wyslac do wszystkich CLOSE_CONNECTION
    const connections = getConnections(peer);
    connections.forEach(conn => sendMessage(conn, 'CLOSE_CONNECTION', peer.id));
    peer.destroy();
  };

  const getConnections = peer => {
    // We have to get the connections out, because these are one-element array values of hashed properties, so they are different every time
    return Object.values(peer.connections).map(conn => conn[0]);
  };

  return { createPeer, clearPeer, connect, sendMessage };
};
