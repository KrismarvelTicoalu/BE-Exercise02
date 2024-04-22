const prisma = require("../db");

const getAllStudents = async () => {
  const students = await prisma.students.findMany();

  return students;
};

const getStudentByNim = async (nim) => {
  const student = await prisma.students.findUnique({
    where: {
      nim,
    },
  });

  return student;
};

const updateStudentByNim = async (nim, nama, alamat, jurusan) => {
  const student = await prisma.students.update({
    where: {
      nim,
    },
    data: {
      nama,
      alamat,
      jurusan,
    },
  });

  return student;
};

const addStudent = async (nim, nama, alamat, jurusan) => {
  const student = await prisma.students.create({
    data: {
      nim,
      nama,
      alamat,
      jurusan,
    },
  });

  return student;
};

const deleteStudentByNim = async (nim) => {
  const student = await prisma.students.delete({
    where: {
      nim,
    },
  });

  return student;
};

module.exports = {
  getAllStudents,
  getStudentByNim,
  updateStudentByNim,
  addStudent,
  deleteStudentByNim,
};
