import Peer from "peerjs";

export function createGame() {
  let game = new Peer();
  return game.id;
}

export function joinGame(nickname) {

}