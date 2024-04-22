const express = require("express");
const prisma = require("../db");
const {
  getAllStudents,
  getStudentByNim,
  updateStudentByNim,
  addStudent,
  deleteStudentByNim,
} = require("./student.service");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allStudents = await getAllStudents();

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
    await addStudent(nim, nama, alamat, jurusan);

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
    const student = await getStudentByNim(req.params.nim);

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
    const updateUser = await updateStudentByNim(
      req.params.nim,
      nama,
      alamat,
      jurusan
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
router.delete("/:nim", async (req, res) => {
  try {
    const deleteUser = await deleteStudentByNim(req.params.nim);

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
