import Peer from 'peerjs';
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { usePeerMessenger } from './peerMessenger';

// peerjs --port 9000 --key peerjs

export const usePeer = () => {
  const [peer, setPeer] = useState();
  const { receiveMessage } = usePeerMessenger();
  // const { addHostConnection } = useContext(GlobalContext);

  useEffect(() => {
    if (peer) {
      peer.on('connection', connection => {
        console.log(`Connected to: ${connection.peer}`);
        // addHostConnection(connection);

        connection.on('data', data => {
          console.log('Received data: ');
          console.log(data);

          receiveMessage(data);
        });
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
        console.log(error);
      });

      console.log(`Listeners set for peer ${peer.id}`);
    }
  }, [peer]);

  async function createPeer() {
    const peer = await new Peer(null, { key: 'peerjs', debug: 2 });

    peer.on('open', id => {
      console.log(`Opened peer with id: ${id}`);
      setPeer(peer);
    });

    return peer;
  }

  async function connect(peer, hostId) {
    const connection = peer.connect(hostId, { serialization: 'json' });

    connection.on('open', () => {
      console.log(`Connected to: ${connection.peer}`);
    });

    return connection;
  };

  const clearConnections = peer => {
    peer.destroy();
  };

  return { createPeer, clearConnections, connect };
};
