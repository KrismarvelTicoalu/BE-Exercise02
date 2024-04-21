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
module.exports = {
  getAllStudents,
  getStudentByNim,
};
