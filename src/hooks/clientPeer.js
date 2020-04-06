import Peer from 'peerjs';
import { useState, useEffect, useRef } from 'react';
import { usePeerMessenger } from './peerMessenger';

export const useClientPeer = () => {
  const [peer, setPeer] = useState();
  const { receiveMessage } = usePeerMessenger();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      // stinky shit
      isInitialMount.current = false;
    } else {
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

  const createPlayerPeer = (hostId, addPlayer) => {
    return new Promise((resolve, reject) => {
      let playerPeer = new Peer(null, { key: 'peerjs', debug: 2 });

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
      const conn = peer.connect(hostId, { serialization: 'json' });

      conn.on('open', () => {
        console.log(`Connected to: ${conn.peer}`);

        conn.on('data', (data) => {
          console.log('Player received data: ');
          console.log(data);

          receiveMessage(data);
        });

        if (conn) {
          resolve(conn);
        } else {
          console.log('Error occured on connection');
          reject();
        }
      });
    });
  };

  return { createPlayerPeer, connectToHost };
};
