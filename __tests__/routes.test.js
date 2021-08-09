const request = require('supertest');
const app = require('../src/index');
const students = require('../src/mocks/students');

describe('GET Routes', () => {
  test('should get all students', async () => {
    const response = await request(app).get('/students');
  
    expect(response.status).toEqual(200);
    expect(response.text).toBe(JSON.stringify(students));
  })
  
  test('should get an existent student by id', async () => {
    const id = '1';
  
    const response = await request(app).get(`/students/${id}`);
  
    expect(response.status).toEqual(200);
  })

  test('should not get existent student by id', async () => {
    const id = '123456789123456789';

    const response = await request(app).get(`/students/${id}`);

    expect(response.status).toEqual(404);
  })
});

describe('POST Routes', () => {
  test('should create a student', async () => {
    const student = {
      name: 'Vinícius Lemos',
      email: 'viniciuslemos@email.com',
      cep: 63870000,
      address: 'Rua Douglas Loma',
      number: 690,
      neighborhood: 'Vila dos Povos Azúis',
      city: 'Boa Viagem',
      uf: 'CE',
      degree: 'Engenharia de Software',
      age: 18
    }

    const response = await request(app).post('/students').send(student);

    const createdStudent = JSON.parse(response.text);

    student.id = createdStudent.id;

    expect(response.status).toEqual(200);
    expect(createdStudent).toStrictEqual(student);
  })

  test('should not create a student with a blank name', async () => {
    const student = {
      name: '',
      email: 'viniciuslemos@email.com',
      cep: 63870000,
      address: 'Rua Douglas Loma',
      number: 690,
      neighborhood: 'Vila dos Povos Azúis',
      city: 'Boa Viagem',
      uf: 'CE',
      degree: 'Engenharia de Software',
      age: 18
    }

    const response = await request(app).post('/students').send(student);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(JSON.stringify({
      error: 'Name is required.'
    }))
  })

  test('should not create a student with a blank e-mail', async () => {
    const student = {
      name: 'Vinícius Lemos',
      email: '',
      cep: 63870000,
      address: 'Rua Douglas Loma',
      number: 690,
      neighborhood: 'Vila dos Povos Azúis',
      city: 'Boa Viagem',
      uf: 'CE',
      degree: 'Engenharia de Software',
      age: 18
    }

    const response = await request(app).post('/students').send(student);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(JSON.stringify({
      error: 'E-mail is required.'
    }))
  })

  test('should not create a student with a blank CEP', async () => {
    const student = {
      name: 'Vinícius Lemos',
      email: 'viniciuslemos@email.com',
      cep: '',
      address: 'Rua Douglas Loma',
      number: 690,
      neighborhood: 'Vila dos Povos Azúis',
      city: 'Boa Viagem',
      uf: 'CE',
      degree: 'Engenharia de Software',
      age: 18
    }

    const response = await request(app).post('/students').send(student);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(JSON.stringify({
      error: 'CEP is required.'
    }))
  })

  test('should not create a student with a blank degree', async () => {
    const student = {
      name: 'Vinícius Lemos',
      email: 'viniciuslemos@email.com',
      cep: 63870000,
      address: 'Rua Douglas Loma',
      number: 690,
      neighborhood: 'Vila dos Povos Azúis',
      city: 'Boa Viagem',
      uf: 'CE',
      degree: '',
      age: 18
    }

    const response = await request(app).post('/students').send(student);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(JSON.stringify({
      error: 'Degree is required.'
    }))
  })

  test('should not create a student with an existent e-email', async () => {
    const student = {
      name: 'Vinícius Lemos',
      email: 'viniciuslemos@email.com',
      cep: 63870000,
      address: 'Rua Douglas Loma',
      number: 690,
      neighborhood: 'Vila dos Povos Azúis',
      city: 'Boa Viagem',
      uf: 'CE',
      degree: 'Engenharia de Software',
      age: 18
    }

    const response = await request(app).post('/students').send(student);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(JSON.stringify({ 
      error: 'This e-mail is already in use.' 
    }));
  })
})

describe('DELETE Routes', () => {
  test('should delete a student by id', async () => {
    const id = '3';

    const response = await request(app).delete(`/students/${id}`);

    expect(response.status).toEqual(204);
  });
})

