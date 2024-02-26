const express = require("express");
const app = express();
const port = 3000;

// // middleware untuk menangani request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/student/login", (req, res) => {
  res.json({
    nama: req.body.nama,
    nim: req.body.nim,
    "nomor regis": req.body.noRegis,
    fakultas: req.body.fakultas,
    prodi: req.body.prodi,
  });
});

// // middleware untuk menangani file statis
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// middleware untuk menangani file upload
const multer = require("multer");
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
  res.send(req.file);
});

// // middleware untuk menangani cors
const cors = require("cors");

app.use(cors({ origin: ["http://localhost:5000"] }));

app.get("/secret", cors({ origin: ["http://localhost:5000"] }), (req, res) => {
  const secret = Math.floor(Math.random() * 100);
  res.json({ secret });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
