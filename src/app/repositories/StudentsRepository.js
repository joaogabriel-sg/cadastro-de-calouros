let students = require('../../mocks/students');

class StudentsRepository {
  findAll() {
    return students;
  }

  findById(id) {
    const studentById = students.find((student) => student.id === id);
    return studentById;
  }

  delete(id) {
    const newStudents = students.filter((student) => student.id !== id);
    students = newStudents;
    return newStudents;
  }
}

module.exports = new StudentsRepository();
