import React, { useState } from 'react';
import ColorPicker from './ColorPicker';
import './LobbyMenu.css';

export default function PlayersList() {
  const playerTestInit = [ //remove later
    {
      nickname: "Bakenszeftwagen",
      color: "#ff0000"
    },
    {
      nickname: "Zrodiasz420",
      color: "#00ff00"
    },
    {
      nickname: "Autism boiii",
      color: "#ffff00"
    },
    {
      nickname: "Bamboozlord",
      color: "#0000ff"
    }
  ]

  /*
    tu trzeba bedzie zrobic jakiegos observer pattern
    to sie jakos na hooksach robi i tym context API?
    Bedziemy potrzebowac czegos w stylu: jak zmieni sie lista z playerami
    to kod tutaj musi to jakby "subskrybowac" i wiedziec ze array z
    graczami w kotekscie glownym sie zmienil. Jesli sie zmienil tu zupdatowac stan
    listy graczy, do tego sie chyba uzywa tego useEffect(),

    to players ktore jest tutaj jest polaczone z kontekstem glownym?
    tzn jak w innym miejscu np peerjs doda gracza to tutaj tez players bedzie to mialo
    czy to trzeba jakos inaczej okodzic?
  */

  const [players, setPlayers] = useState(playerTestInit);

  return (
  <ul className="player-list">
    {
      players.map((player, i) => {
        return( 
          <li key={i}>
            {player.nickname} <ColorPicker startColor={player.color}/>
          </li>
        )
      })
    }
  </ul>
  )
}
