import Peer from "peerjs";

export const createHostPeer = (callback) => {
  let peer = new Peer(null, { key: 'peerjs', debug: 2 });
  
  peer.on('open', () => {
    setHostEventListeners(peer);
    callback(peer);
  });
}

const setHostEventListeners = (peer) => {
  peer.on('connection', (c) => {
    console.log(`Connected to: ${c.peer}`);

    c.on('data', (data) => {
      console.log(data);
    });
  });
}

export const createPlayerPeer = (callback) => {
  let peer = new Peer(null, { key: 'peerjs', debug: 2 });

  peer.on('open', (id) => {
    console.log(id);
    callback(peer);
  });
}