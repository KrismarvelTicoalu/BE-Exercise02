const express = require("express");
const app = express();
const port = 3000;
const db = require("./db");

// // middleware untuk menangani request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/students", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM students");
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/students", async (req, res) => {
  const { nim, nama, alamat, jurusan } = req.body;
  try {
    const result = await db.query(
      `INSERT into students (nim, nama, alamat, jurusan) values ('${nim}', '${nama}', '${alamat}', '${jurusan}')`
    );
    res.status(200).json({
      status: "success",
      message: "data berhasil dimasukan",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Update Student by ID
app.patch("/students/:nim", async (req, res) => {
  const { nama, alamat, jurusan } = req.body;
  try {
    const result = await db.query(
      `UPDATE students SET nama = '${nama}', alamat = '${alamat}', jurusan = '${jurusan}' WHERE nim = '${req.params.nim}'`
    );
    res.status(200).json({
      status: "success",
      message: "data berhasil diperbarui",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Student by ID
app.delete("/students/:nim", async (req, res) => {
  try {
    const result = await db.query(
      `DELETE FROM students WHERE nim = '${req.params.nim}'`
    );
    res.status(200).json({
      status: "success",
      message: "data berhasil dihapus",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Get student by ID
app.get("/students/:nim", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM students WHERE nim = '${req.params.nim}'`
    );
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
