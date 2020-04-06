import Peer from 'peerjs';
import { useState, useEffect } from 'react';
import { usePeerMessenger } from './peerMessenger';

export const useClientPeer = () => {
  const [peer, setPeer] = useState();
  const { receiveMessage } = usePeerMessenger();

  useEffect(() => {
    if (peer) {
      peer.on('disconnected', () => {
        console.log(`${peer.id} disconnected`);
        peer.destroy();
      });

      peer.on('close', () => {
        console.log(`${peer.id} closed`);
        peer.destroy();
      });

      peer.on('error', (error) => {
        console.log(error);
      });

      console.log(`Listeners set for peer ${peer.id}`);
    }
  }, [peer]);

  const createPlayerPeer = () => {
    return new Promise((resolve, reject) => {
      const playerPeer = new Peer(null, { key: 'peerjs', debug: 2 });

      playerPeer.on('open', (id) => {
        console.log(`Opened peer with id: ${id}`);
        setPeer(playerPeer);

        if (playerPeer.id) {
          resolve(playerPeer);
        } else {
          console.log('Error occured when creating peer');
          reject();
        }
      });
    });
  };

  const connectToHost = (peer, hostId) => {
    return new Promise((resolve, reject) => {
      const connection = peer.connect(hostId, { serialization: 'json' });

      connection.on('open', () => {
        console.log(`Connected to: ${conn.peer}`);

        connection.on('data', (data) => {
          console.log('Player received data: ');
          console.log(data);

          receiveMessage(data);
        });

        if (connection) {
          resolve(connection);
        } else {
          console.log('Error occured on connection');
          reject();
        }
      });
    });
  };

  return { createPlayerPeer, connectToHost };
};
