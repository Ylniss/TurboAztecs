import Peer from 'peerjs';
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { usePeerMessenger } from './peerMessenger';
import { useHistory } from 'react-router-dom';

// peerjs --port 9000 --key peerjs

export const usePeer = () => {
  const [peer, setPeer] = useState();
  const { receiveMessage, sendMessage } = usePeerMessenger();
  const { addConnection } = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    if (peer) {
      peer.on('connection', connection => {
        console.log(`Connected to: ${connection.peer}`);

        connection.on('data', data => {
          receiveMessage(data);
        });

        addConnection(connection);
      });

      peer.on('disconnected', () => {
        console.log(`${peer} disconnected.`);
        peer.destroy();
      });

      peer.on('close', () => {
        console.log(`${peer} closed.`);
        peer.destroy();
      });

      peer.on('error', error => {
        history.push('/lobby');
        console.log(error);
      });

      console.log(`Listeners set for peer ${peer.id}`);
    }
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
          console.log('Error occured when creating host peer');
          reject();
        }
      });
    });
  };

  const connect = (peer, hostId) => {
    return new Promise((resolve, reject) => {
      const connection = peer.connect(hostId, { serialization: 'json' });

      connection.on('open', () => {
        console.log(`Connection opened with: ${connection.peer}`);
        resolve(connection);
      });
    });
  };

  const clearConnections = peer => {
    peer.destroy();
  };

  return { createPeer, clearConnections, connect };
};
