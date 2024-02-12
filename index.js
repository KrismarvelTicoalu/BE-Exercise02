const http = require("http");
const members = require("./members");
const users = require("./users");
const moment = require("moment");
const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;

app.use(morgan("combined"));

app.get("/", (req, res) => res.send("This is the home page"));

app.get("/about", (req, res) => {
  res.json({
    Status: "success",
    Message: "response success",
    Description: "Exercise #03",
    Date: moment().format(),
    Data: members,
  });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
