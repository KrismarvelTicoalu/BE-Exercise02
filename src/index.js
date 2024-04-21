const express = require("express");
const app = express();
const port = 3000;
const db = require("../db");

// // middleware untuk menangani request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const studentController = require("./student/student.controller");

app.use("/students", studentController);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
