const express = require("express");
const app = express();
const port = 3000;
const users = require("./users");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

//  middleware untuk menangani request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware log
app.use(morgan("combined"));

// // middleware untuk menangani file statis
app.use(express.static(path.join(__dirname, "public")));

// Endpoints
// 1. GET: /users
app.get("/users", (req, res) => {
  res.json(users);
});

// 2. GET: /users/:name
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

// 3. POST: /users
app.post("/users", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.json({
      message: "Masukkan data yang akan diubah",
    });
  } else {
    // nama diubah menjadi titlecase
    let name = req.params.name.toLowerCase();
    let firstLetter = name.charAt(0).toUpperCase();
    name = firstLetter + name.slice(1);
    users.push({
      id: Number(req.body.id),
      name: name,
    });
    res.json(users);
  }
});

// 4. POST: /upload
// middleware untuk menangani file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (file) {
    const target = path.join(__dirname, "public", file.originalname);
    fs.renameSync(file.path, target);
    res.send("File berhasil diupload");
  }
});

// 5. PUT: /users/:name
app.put("/users/:name", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.json({
      message: "Masukkan data yang akan diubah",
    });
  }

  // nama diubah menjadi titlecase
  let name = req.params.name.toLowerCase();
  let firstLetter = name.charAt(0).toUpperCase();
  name = firstLetter + name.slice(1);

  // kirim data berdasark nama
  for (let i = 0; i < users.length; i++) {
    if (users[i].name === name) {
      users[i].name = req.body.name;
      users[i].id = req.body.id;

      res.json(users[i]);
    }
  }

  // kirim pesan apabila data tidak ditemukan
  res.json({
    message: "Data user tidak ditemukan",
  });
});

// 6. DELETE: /users/:name
app.delete("/users/:name", (req, res) => {
  // nama diubah menjadi titlecase
  let name = req.params.name.toLowerCase();
  let firstLetter = name.charAt(0).toUpperCase();
  name = firstLetter + name.slice(1);

  const itemToDelete = users.find((el) => el.name === name);
  const index = users.indexOf(itemToDelete);

  users.splice(index, 1);
  res.json(users);
});

// middleware menangani 404
const notFound = (req, res, next) => {
  res.status(404).json({
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

// // middleware untuk menangani cors
const cors = require("cors");

app.use(cors({ origin: ["http://127.0.0.1:5500"] }));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
