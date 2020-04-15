/* eslint-disable react-hooks/exhaustive-deps */
import Peer from 'peerjs';
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { usePeerMessenger } from './peerMessenger';

export const useHostPeer = () => {
  const [peer, setPeer] = useState();
  const { receiveMessage } = usePeerMessenger();
  const { addHostConnection } = useContext(GlobalContext);

  useEffect(() => {
    if (peer) {
      peer.on('connection', connection => {
        console.log(`Host Connected to: ${connection.peer}`);
        addHostConnection(connection);

        connection.on('data', data => {
          console.log('Host received data: ');
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

  const createHostPeer = () => {
    return new Promise((resolve, reject) => {
      const hostPeer = new Peer(null, { key: 'peerjs', debug: 2 });

      hostPeer.on('open', id => {
        console.log(`Opened peer with id: ${id}`);
        setPeer(hostPeer);

        if (hostPeer) {
          resolve(hostPeer);
        } else {
          console.log('Error occured when creating host peer');
          reject();
        }
      });
    });
  };

  const clearHostConnections = connections => {
    connections.forEach(conn => {
      conn.close();

      console.log('Closed connection:');
      console.log(conn);
    });
  };

  return { createHostPeer, clearHostConnections };
};
