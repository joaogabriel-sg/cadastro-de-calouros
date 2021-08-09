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

  create({
    id, name, email, cep, address, number, neighborhood, city, uf, degree, age,
  }) {
    const newStudent = {
      id, name, email, cep, address, number, neighborhood, city, uf, degree, age,
    };

    students.push(newStudent);

    return newStudent;
  }

  update(id, {
    name, email, cep, address, number, neighborhood, city, uf, degree, age,
  }) {
    const updatedStudent = {
      id, name, email, cep, address, number, neighborhood, city, uf, degree, age,
    };

    students = students.map((currentStudent) => (currentStudent.id === id
      ? updatedStudent
      : currentStudent));

    return updatedStudent;
  }

  delete(id) {
    const newStudents = students.filter((student) => student.id !== id);
    students = newStudents;
    return newStudents;
  }
}

module.exports = new StudentsRepository();
