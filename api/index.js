import express from "express";

const getRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomId = () => Math.random().toString(36).substring(2, 12);

const buildMatchData = () => {
  const playersCount = getRandomInteger(2, 4);
  const scoreToWin = getRandomInteger(18, 24);

  const players = Array(playersCount)
    .fill(null)
    .map((_, idx) => ({
      name: `Player ${idx + 1}`,
      id: getRandomId(),
      imageUrl: `http://localhost:8000/${idx + 1}.png`,
    }));

  return {
    players,
    scoreToWin,
    matchId: getRandomId(),
  };
};

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(express.static("./public"));

app.get("/api/game", (req, res) => {
  return res.status(200).send(buildMatchData());
});

app.post("/api/game", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      success: false,
      error: "Missing body in post request",
    });
  }

  return res.status(200).send({
    success: true,
    error: null,
  });
});

app.listen(8000, () => console.log(`Server listening on port 8000!`));
