const prisma = require("../db");
const {
  findStudents,
  findStudentByNim,
  editStudentByNim,
  insertStudent,
  removeStudentByNim,
} = require("./student.repository");

const getAllStudents = async () => {
  const students = await findStudents();

  return students;
};

const getStudentByNim = async (nim) => {
  const student = await findStudentByNim(nim);

  return student;
};

const updateStudentByNim = async (nim, nama, alamat, jurusan) => {
  const student = await editStudentByNim(nim, nama, alamat, jurusan);

  return student;
};

const addStudent = async (nim, nama, alamat, jurusan) => {
  const student = await insertStudent(nim, nama, alamat, jurusan);

  return student;
};

const deleteStudentByNim = async (nim) => {
  const student = await removeStudentByNim(nim);

  return student;
};

module.exports = {
  getAllStudents,
  getStudentByNim,
  updateStudentByNim,
  addStudent,
  deleteStudentByNim,
};
