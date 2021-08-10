const StudentsRepository = require('../repositories/StudentsRepository');
const isEmailValid = require('../../utils/isEmailValid');
const isCepValid = require('../../utils/isCepValid');
const isDegreeExistent = require('../../helpers/isDegreeExistent');

class StudentController {
  index(req, res) {
    const students = StudentsRepository.findAll();

    res.json(students);
  }

  show(req, res) {
    const { id } = req.params;
    const student = StudentsRepository.findById(id);

    if (!student) { return res.status(404).json({ message: 'Student not found' }); }

    res.json(student);
  }

  store(req, res) {
    const {
      name, email, cep, address, number, neighborhood, city, uf, degree, age,
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    if (!email) {
      return res.status(400).json({ error: 'E-mail is required.' });
    }

    if (!cep) {
      return res.status(400).json({ error: 'CEP is required.' });
    }

    if (!degree) {
      return res.status(400).json({ error: 'Degree is required.' });
    }

    if (!isEmailValid(email)) {
      return res.status(400).json({ error: 'This e-mail is invalid.' });
    }

    const contactExists = StudentsRepository.findByEmail(email);

    if (contactExists) {
      return res.status(400).json({ error: 'This e-mail is already in use.' });
    }

    if (!isCepValid(cep)) {
      return res.status(400).json({ error: 'This CEP is invalid.' });
    }

    if (!isDegreeExistent(degree)) {
      return res.status(400).json({ error: 'This degree is invalid or non-exist.' });
    }

    const lastId = StudentsRepository.findLast()?.id || '0';

    const id = String(Number(lastId) + 1);

    const student = StudentsRepository.create({
      id, name, email, cep, address, number, neighborhood, city, uf, degree, age,
    });

    res.json(student);
  }

  update(req, res) {
    const { id } = req.params;

    const {
      name, email, cep, address, number, neighborhood, city, uf, degree, age,
    } = req.body;

    const studentExists = StudentsRepository.findById(id);

    if (!studentExists) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    if (!email) {
      return res.status(400).json({ error: 'E-mail is required.' });
    }

    if (!cep) {
      return res.status(400).json({ error: 'CEP is required.' });
    }

    if (!degree) {
      return res.status(400).json({ error: 'Degree is required.' });
    }

    if (!isEmailValid(email)) {
      return res.status(400).json({ error: 'This e-mail is invalid.' });
    }

    const studentByEmail = StudentsRepository.findByEmail(email);

    if (!studentByEmail) {
      return res.status(400).json({ error: 'This e-mail does not exist.' });
    }

    if (studentByEmail.id !== id) {
      return res.status(400).json({ error: 'This e-mail is already in use.' });
    }

    if (!isCepValid(cep)) {
      return res.status(400).json({ error: 'This CEP is invalid.' });
    }

    if (!isDegreeExistent(degree)) {
      return res.status(400).json({ error: 'This degree is invalid or non-exist.' });
    }

    const student = StudentsRepository.update(id, {
      name, email, cep, address, number, neighborhood, city, uf, degree, age,
    });

    res.json(student);
  }

  delete(req, res) {
    const { id } = req.params;
    StudentsRepository.delete(id);

    res.sendStatus(204);
  }
}

module.exports = new StudentController();
