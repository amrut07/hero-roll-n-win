import React from "react";

export default function Player({ data, getScore, won }) {
  const playerRoll = (id) => {
    const diceInput = Math.floor(Math.random() * 6) + 1;
    getScore(id, diceInput);
  };

  return (
    <span className={`player-container ${data.id === won ? "winner" : ""}`}>
      <span>
        <b>{data.name}</b>
      </span>
      <img src={data.imageUrl} alt="player 1"></img>
      <span className="player-container__score">
        Score: <strong>{data.score}</strong>
      </span>
      <button onClick={() => playerRoll(data.id)} disabled={!data.turn}>
        Roll
      </button>
    </span>
  );
}
