const express = require("express");
const app = express();
const port = 3000;
const users = require("users");

// middleware log
const log = (req, res, next) => {
  console.log(Date.now() + " " + req.ip + req.originalUrl);
  next();
};
app.use(log);

// deklarasi routing
app.get("/users", (req, res) => {
  res.json();
});

// middleware menangani 404
const notFound = (req, res, next) => {
  res.json({
    status: "error",
    message: "resourse tidak ditemukan",
  });
};
app.use(notFound);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
