const request = require('supertest');
const app = require('../src/index');
const students = require('../src/mocks/students');
const StudentsRepository = require('../src/app/repositories/StudentsRepository');

test('should get all students', async () => {
  const response = await request(app).get('/students');

  expect(response.status).toEqual(200);
  expect(response.text).toBe(JSON.stringify(students));
})

test('should get a student by id', async () => {
  const id = '1';
  const student = StudentsRepository.findById(id);

  const response = await request(app).get(`/students/${id}`);

  expect(response.status).toEqual(200);
  expect(response.text).toBe(JSON.stringify(student));
})
