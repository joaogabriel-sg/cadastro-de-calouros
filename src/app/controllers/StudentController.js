const StudentsRepository = require('../repositories/StudentsRepository');

class StudentController {
  index(req, res) {
    const students = StudentsRepository.findAll();
    
    res.json(students);
  }

  show(req, res) {
    const {id} = req.params;
    const student = StudentsRepository.findById(id);

    if (!student)
      return res.status(404).json({message: "Student not found"})

    res.json(student);
  }

  delete(req, res) {
    const {id} = req.params;
    StudentsRepository.delete(id);

    res.sendStatus(204);
  }
}

module.exports = new StudentController();
