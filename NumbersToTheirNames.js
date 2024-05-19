import express, { json } from "express";
import extenso from "extenso";
import dotenv from "dotenv";

const app = express();
const port = 3000;

dotenv.config();

const host = process.env.HOST || "localhost";

app.use(json());

app.get("/", (req, res) => {
  res.send("Number to their name");
});

app.post("/convert", (req, res) => {
  const { number } = req.body;

  if (number === undefined || typeof number !== "number") {
    return res
      .status(400)
      .json({ error: "Invalid input, please provide a number." });
  }

  try {
    const numberConvertInWords = extenso(number);
    res.json({ words: numberConvertInWords });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error converting number to your real name." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
