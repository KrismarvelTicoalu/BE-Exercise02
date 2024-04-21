// Layer untuk handle request dan response
// Biasanya juga handle validasi body
const express = require("express");
const prisma = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allStudents = await prisma.students.findMany();
    res.status(200).json({
      status: "success",
      data: allStudents,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  const { nim, nama, alamat, jurusan } = req.body;
  try {
    await prisma.students.create({
      data: {
        nim: nim,
        nama: nama,
        alamat: alamat,
        jurusan: jurusan,
      },
    });
    res.status(200).json({
      status: "success",
      message: "data berhasil dimasukan",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Get student by ID
router.get("/:nim", async (req, res) => {
  try {
    const student = await prisma.students.findUnique({
      where: {
        nim: req.params.nim,
      },
    });
    res.status(200).json({
      status: "success",
      data: student,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Update Student by ID
router.patch("/:nim", async (req, res) => {
  const { nama, alamat, jurusan } = req.body;
  try {
    const updateUser = await prisma.students.update({
      where: {
        nim: req.params.nim,
      },
      data: {
        nama: nama,
        alamat: alamat,
        jurusan: jurusan,
      },
    });
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
router.delete("/:nim", async (req, res) => {
  try {
    const deleteUser = await prisma.students.delete({
      where: {
        nim: req.params.nim,
      },
    });
    res.status(200).json({
      status: "success",
      message: "data berhasil dihapus",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
