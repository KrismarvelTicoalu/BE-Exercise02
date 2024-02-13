const express = require("express");
const app = express();
const port = 3000;
const users = require("./users");
const morgan = require("morgan");

// middleware log
app.use(morgan("combined"));

// deklarasi routing
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:name", (req, res) => {
  // nama diubah menjadi titlecase
  let name = req.params.name.toLowerCase();
  let firstLetter = name.charAt(0).toUpperCase();
  name = firstLetter + name.slice(1);

  // kirim data berdasark nama
  for (let i = 0; i < users.length; i++) {
    if (users[i].name === name) {
      res.json(users[i]);
    }
  }

  // kirim pesan apabila data tidak ditemukan
  res.json({
    message: "Data user tidak ditemukan",
  });
});

// middleware menangani 404
const notFound = (req, res, next) => {
  res.json({
    status: "error",
    message: "resource tidak ditemukan",
  });
};
app.use(notFound);

// middleware untuk menangani error
const errorHandling = (err, req, res, next) => {
  res.json({
    status: "error",
    message: "terjadi kesalahan pada server",
  });
};
app.use(errorHandling);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
