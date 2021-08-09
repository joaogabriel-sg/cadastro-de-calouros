let students = require('../../mocks/students');

class StudentsRepository {
  findAll() {
    return students;
  }

  findById(id) {
    const studentById = students.find((student) => student.id === id);
    return studentById;
  }

  findByEmail(email) {
    const studentByEmail = students.find((student) => student.email === email);
    return studentByEmail;
  }

  findLast() {
    const lastStudent = students[students.length - 1];
    return lastStudent;
  }

  create(student) {
    students.push(student);
    return student;
  }

  delete(id) {
    const newStudents = students.filter((student) => student.id !== id);
    students = newStudents;
    return newStudents;
  }
}

module.exports = new StudentsRepository();
