const express = require("express");
const app = express();

app.use(express.json());


const students = []


app.get('/', (req,res) => {
  res.send('Hello, World!')
}
)



app.post("/student", (req, res) => {
  const {
    id = Date.now(),
    studentName,
    age,
    className,
    gender,
    email,
    address,
    subjects,
  } = req.body || {};

  if (!studentName) {
    return res.status(400).json({
      message: "studentName is required",
    });
  }

  students.push({
    id,
    studentName,
    age,
    className,
    gender,
    email,
    address,
    subjects,
  });

  res.json({
    message: "Student added successfully",
  });
});

app.get("/students", (req, res) => {
  res.json({
    students,
  });
});

app.get("/student/:id", (req, res) => {
  const { id } = req.params;
  const student = students.find((student) => student.id == id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.json({
    student,
  });
});

app.put("/student/:id", (req, res) => {
  const { id } = req.params;

  const studentIndex = students.findIndex(
    (student) => student.id == id
  );

  if (studentIndex === -1) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  students[studentIndex] = {
    ...students[studentIndex],
    ...req.body,
  };
console.log(req.body);
console.log(students[studentIndex]);

  res.json({
    message: "Student updated successfully",
    student: students[studentIndex],
  });
});

app.delete("/student/:id", (req, res) => {
  const { id } = req.params;
  const studentIndex = students.findIndex((student) => student.id == id);

  if (studentIndex === -1) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  students.splice(studentIndex, 1);

  res.json({
    message: "Student deleted successfully",
  });
});


app.listen(4300, () => {
  console.log('Server is running on port 4300')
})
