const students = require('../../mocks/students');

class StudentsRepository {
  findAll() {
    return students;
  }

  findById(id) {
    const studentById = students.find((student) => student.id === id);
    return studentById;
  }
}

module.exports = new StudentsRepository();
