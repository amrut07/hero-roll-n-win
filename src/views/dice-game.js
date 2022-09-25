import React, { useEffect, useState } from "react";
import Player from "../components/Player";

export default function DiceGame() {
  const [gameData, setGameData] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/game")
      .then((response) => response.json())
      .then((data) => {
        data.players?.forEach((player, index) => {
          player["turn"] = !index;
          player["score"] = 0;
        });
        setGameData(data);
      });
  }, []);

  const updateScore = (playerId, diceInput) => {
    const data = { ...gameData };
    data.players.forEach((player, index) => {
      if (player.id === playerId) {
        // updating player score
        player.score += diceInput;
        player.turn = false;
        // checking whether the player win or not and logging the winner
        if (player.score >= data.scoreToWin) {
          const payload = { matchId: data?.matchId, winnerId: player.id };
          logWinner(payload);
          setWinner(player);
        } else {
          // enable next player turn;
          data.players[
            index + 1 < data.players.length ? index + 1 : 0
          ].turn = true;
        }
      }
    });
    setGameData(data);
  };

  const logWinner = async (payload) => {
    await fetch("http://localhost:8000/api/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Successfully logged winner of the match`, data);
      })
      .catch((error) => {
        console.error(
          `Error occurred while logging the winner of the match`,
          error
        );
      });
  };

  return (
    <div className="hero-game-container">
      <p className="hero-game-container__match-id">
        Match ID: {gameData?.matchId}
      </p>
      <h1>Hero Roll & Win</h1>
      <h3> Score to win: {gameData?.scoreToWin}</h3>
      {winner && <h2>Congratulations! {winner?.name} won the match.</h2>}
      <div>
        {gameData?.players.map((player, index) => (
          <Player
            key={index}
            data={player}
            getScore={updateScore}
            won={winner?.id}
          />
        ))}
      </div>
    </div>
  );
}
