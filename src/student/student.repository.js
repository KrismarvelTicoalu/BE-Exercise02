const prisma = require("../db");

const findStudents = async () => {
  const students = await prisma.students.findMany();

  return students;
};

const findStudentByNim = async (nim) => {
  const student = await prisma.students.findUnique({
    where: {
      nim,
    },
  });

  return student;
};

const editStudentByNim = async (nim, nama, alamat, jurusan) => {
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
};

const insertStudent = async (nim, nama, alamat, jurusan) => {
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

const removeStudentByNim = async (nim) => {
  const student = await prisma.students.delete({
    where: {
      nim,
    },
  });

  return student;
};

module.exports = {
  findStudents,
  findStudentByNim,
  editStudentByNim,
  insertStudent,
  removeStudentByNim,
};
