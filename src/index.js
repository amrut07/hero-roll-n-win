import React from "react";
import { render } from "react-dom";

import "./index.scss";
import DiceGame from "./views/dice-game";

const App = () => (
  <div>
    <DiceGame />
  </div>
);

render(<App />, document.getElementById("app"));
