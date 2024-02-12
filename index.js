const http = require("http");
const members = require("./members");
const users = require("./users");
const moment = require("moment");
const express = require("express");
const app = express();
const port = 3000;

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
// const server = http
//   .createServer((req, res) => {
//     res.statusCode = 200;
//     const url = req.url;

//     if (url === "/") {
//       res.setHeader("Content-Type", "text/plain");
//       res.write("This is the home page");
//     } else if (url === "/about") {
//       res.setHeader("Content-Type", "text/json");
//       res.write(
//         JSON.stringify({
//           Status: "success",
//           Message: "response success",
//           Description: "Exercise #02",
//           Date: moment().format(),
//           Data: members,
//         })
//       );
//     } else if (url === "/users") {
//       res.setHeader("Content-Type", "text/json");
//       res.write(JSON.stringify(users));
//     }
//     res.end();
//   })
//   .listen(3000);
