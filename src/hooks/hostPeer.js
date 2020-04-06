import Peer from 'peerjs';
import { useEffect, useState, useRef, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { usePeerMessenger } from './peerMessenger';

// peerjs --port 9000 --key peerjs

export const useHostPeer = () => {
  const [peer, setPeer] = useState();
  const { receiveMessage } = usePeerMessenger();
  const isInitialMount = useRef(true);
  const { addHostConnection } = useContext(GlobalContext);

  useEffect(() => {
    if (isInitialMount.current) { // stinky shit
      isInitialMount.current = false;
    } else {
      peer.on('connection', conn => {
        console.log(`Host Connected to: ${conn.peer}`);
        addHostConnection(conn);
        setHostConnOnData(conn);
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

  const createHostPeer = async () => {
    return new Promise((resolve, reject) => {
      let hostPeer = new Peer(null, { key: 'peerjs', debug: 2 });
    
      hostPeer.on('open', id => {
        console.log(`Opened peer with id: ${id}`);
        setPeer(hostPeer);

        if (hostPeer) {
          resolve(hostPeer);
        } else {
          console.log("Error occured when creating host peer");
          reject();
        }
      });
    });
  };

  const setHostConnOnData = conn => {
    conn.on('data', data => {
      console.log('Host received data: ');
      console.log(data);
      
      receiveMessage(data);
    });
  };

  const clearConnections = (peer) => {
    peer.destroy();
  }

  return { createHostPeer, clearConnections };
};
