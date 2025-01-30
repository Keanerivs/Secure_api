const express = require("express");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");


const app = express();
const port = 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 1,
  delayMs: () => 3000,
});

app.use(speedLimiter);
app.use(limiter);
app.use(express.static("public"));

app.get("/secure_api", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
