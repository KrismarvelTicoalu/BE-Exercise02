const http = require("http");

const server = http
  .createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.write("This is the home page");
    res.end();
  })
  .listen(3000);
