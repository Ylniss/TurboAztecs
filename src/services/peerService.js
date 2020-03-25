import Peer from "peerjs";

export async function createGame() {
  let game = new Peer( generateId(), { debug: 2 });
  // jak sie nie poda id i pozwoli peerowi je generowac, to trwa to 11-12 sekund i problematyczne jest odebranie go w MainMenu
  let gameId = game.id;

  // game.on('open', (id) => {
  //   if (game.id === null) {
  //     console.log('Received null id from peer open');
  //     game.id = gameId;
  //   } else {
  //     gameId = game.id;
  //   }

  //   console.log(game.id);
  //   return game.id;
  // });

  game.on('connection', (c) => {
    // TODO implement connecting
  });

  game.on('disconnected', () => {
    // Workaround for peer.reconnect() deleting previous id
    
  })

  return gameId;
}

export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function joinGame(nickname) {

}