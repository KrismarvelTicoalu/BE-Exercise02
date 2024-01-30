const http = require("http");
const members = require("./members");

const server = http
  .createServer((req, res) => {
    res.statusCode = 200;
    const url = req.url;

    if (url === "/") {
      res.setHeader("Content-Type", "text/plain");
      res.write("This is the home page");
    } else if (url === "/about") {
      res.setHeader("Content-Type", "text/json");
      res.write(
        JSON.stringify({
          Status: "success",
          Message: "response success",
          Description: "Exercise #02",
          Data: members,
        })
      );
    }
    res.end();
  })
  .listen(3000);
