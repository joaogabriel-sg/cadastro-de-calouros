const request = require('supertest');
const app = require('../src/index');
const students = require('../src/mocks/students');

describe('GET Routes', () => {
  test('should get all students', async () => {
    const response = await request(app).get('/students');

    expect(response.status).toEqual(200);
    expect(response.text).toBe(JSON.stringify(students));
  });

  test('should get an existent student by id', async () => {
    const id = '1';

    const response = await request(app).get(`/students/${id}`);

    expect(response.status).toEqual(200);
  });

  test('should not get an non-existent student by id', async () => {
    const id = '123456789123456789';

    const response = await request(app).get(`/students/${id}`);

    expect(response.status).toEqual(404);
  });
});

describe('POST Routes', () => {
  test('should create a new student', async () => {
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
      age: 18,
    };

    const response = await request(app).post('/students').send(student);

    const createdStudent = JSON.parse(response.text);

    student.id = createdStudent.id;

    expect(response.status).toEqual(200);
    expect(createdStudent).toStrictEqual(student);
  });

  test('should not create a new student with a blank name', async () => {
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
      age: 18,
    };

    const response = await request(app).post('/students').send(student);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(JSON.stringify({
      error: 'Name is required.',
    }));
  });

  test('should not create a new student with a blank e-mail', async () => {
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
      age: 18,
    };

    const response = await request(app).post('/students').send(student);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(JSON.stringify({
      error: 'E-mail is required.',
    }));
  });

  test('should not create a new student with a blank CEP', async () => {
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
      age: 18,
    };

    const response = await request(app).post('/students').send(student);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(JSON.stringify({
      error: 'CEP is required.',
    }));
  });

  test('should not create a new student with a blank degree', async () => {
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
      age: 18,
    };

    const response = await request(app).post('/students').send(student);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(JSON.stringify({
      error: 'Degree is required.',
    }));
  });

  test('should not create a new student with an invalid e-email', async () => {
    const student = {
      name: 'Vinícius Lemos',
      email: 'vin1%@0_!*_-d@0em_--1m.com',
      cep: 63870000,
      address: 'Rua Douglas Loma',
      number: 690,
      neighborhood: 'Vila dos Povos Azúis',
      city: 'Boa Viagem',
      uf: 'CE',
      degree: 'Engenharia de Software',
      age: 18,
    };

    const response = await request(app).post('/students').send(student);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(JSON.stringify({
      error: 'This e-mail is invalid.',
    }));
  });

  test('should not create a new student with an existent e-email', async () => {
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
      age: 18,
    };

    const response = await request(app).post('/students').send(student);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(JSON.stringify({
      error: 'This e-mail is already in use.',
    }));
  });

  test('should not create a new student with a invalid or non-existent degree', async () => {
    const student = {
      name: 'Vinícius Lemos',
      email: 'vini@email.com',
      cep: 63870000,
      address: 'Rua Douglas Loma',
      number: 690,
      neighborhood: 'Vila dos Povos Azúis',
      city: 'Boa Viagem',
      uf: 'CE',
      degree: 'Engenharia Elétrica',
      age: 18,
    };

    const response = await request(app).post('/students').send(student);

    const createdStudent = JSON.parse(response.text);

    student.id = createdStudent.id;

    expect(response.status).toEqual(400);
    expect(response.text).toContain(JSON.stringify({
      error: 'This degree is invalid or non-exist.',
    }));
  });
});

describe('PUT Routes', () => {
  test('should update an existent student', async () => {
    const id = '1';
    const student = {
      name: 'João Gabriel Silva Gomes',
      email: 'joaogabriel@email.com',
      cep: 63870000,
      address: 'Avenida Conde Mota do Vale',
      number: 990,
      neighborhood: 'Uirapuru',
      city: 'Fortaleza',
      uf: 'CE',
      degree: 'Sistemas e Mídias Digitais',
      age: 20,
    };

    const response = await request(app).put(`/students/${id}`).send(student);

    const updatedStudent = JSON.parse(response.text);

    expect(response.status).toEqual(200);
    expect(updatedStudent).toStrictEqual({ id, ...student });
  });

  test('should not update a non-existent student', async () => {
    const id = '9892989';
    const student = {
      name: 'João Gabriel',
      email: 'joaogabriel@email.com',
      cep: 63870000,
      address: 'Avenida Conde Mota do Vale',
      number: 990,
      neighborhood: 'Uirapuru',
      city: 'Fortaleza',
      uf: 'CE',
      degree: 'Sistemas e Mídias Digitais',
      age: 20,
    };

    const response = await request(app).put(`/students/${id}`).send(student);

    expect(response.status).toEqual(404);
    expect(response.text).toContain(JSON.stringify({
      error: 'Student not found.',
    }));
  });

  test('should not update an existent student with a blank name', async () => {
    const id = '1';
    const student = {
      name: '',
      email: 'joaogabriel@email.com',
      cep: 63870000,
      address: 'Avenida Conde Mota do Vale',
      number: 990,
      neighborhood: 'Uirapuru',
      city: 'Fortaleza',
      uf: 'CE',
      degree: 'Sistemas e Mídias Digitais',
      age: 20,
    };

    const response = await request(app).put(`/students/${id}`).send(student);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(JSON.stringify({
      error: 'Name is required.',
    }));
  });

  test('should not update an existent student with a blank e-mail', async () => {
    const id = '1';
    const student = {
      name: 'João Gabriel Silva Gomes',
      email: '',
      cep: 63870000,
      address: 'Avenida Conde Mota do Vale',
      number: 990,
      neighborhood: 'Uirapuru',
      city: 'Fortaleza',
      uf: 'CE',
      degree: 'Sistemas e Mídias Digitais',
      age: 20,
    };

    const response = await request(app).put(`/students/${id}`).send(student);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(JSON.stringify({
      error: 'E-mail is required.',
    }));
  });

  test('should not update an existent student with a blank CEP', async () => {
    const id = '1';
    const student = {
      name: 'João Gabriel Silva Gomes',
      email: 'joaogabriel@email.com',
      cep: '',
      address: 'Avenida Conde Mota do Vale',
      number: 990,
      neighborhood: 'Uirapuru',
      city: 'Fortaleza',
      uf: 'CE',
      degree: 'Sistemas e Mídias Digitais',
      age: 20,
    };

    const response = await request(app).put(`/students/${id}`).send(student);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(JSON.stringify({
      error: 'CEP is required.',
    }));
  });

  test('should not update an existent student with a blank degree', async () => {
    const id = '1';
    const student = {
      name: 'João Gabriel Silva Gomes',
      email: 'joaogabriel@email.com',
      cep: 63870000,
      address: 'Avenida Conde Mota do Vale',
      number: 990,
      neighborhood: 'Uirapuru',
      city: 'Fortaleza',
      uf: 'CE',
      degree: '',
      age: 20,
    };

    const response = await request(app).put(`/students/${id}`).send(student);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(JSON.stringify({
      error: 'Degree is required.',
    }));
  });

  test('should not update an existent student with an invalid e-mail', async () => {
    const id = '1';
    const student = {
      name: 'João Gabriel Silva Gomes',
      email: 'joaa149-++$!=4149jao@em9-1))c.com',
      cep: 63870000,
      address: 'Avenida Conde Mota do Vale',
      number: 990,
      neighborhood: 'Uirapuru',
      city: 'Fortaleza',
      uf: 'CE',
      degree: 'Sistemas e Mídias Digitais',
      age: 20,
    };

    const response = await request(app).put(`/students/${id}`).send(student);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(JSON.stringify({
      error: 'This e-mail is invalid.',
    }));
  });

  test('should not update an existent student with a non-existent e-mail', async () => {
    const id = '1';
    const student = {
      name: 'João Gabriel Silva Gomes',
      email: 'jgsg@email.com',
      cep: 63870000,
      address: 'Avenida Conde Mota do Vale',
      number: 990,
      neighborhood: 'Uirapuru',
      city: 'Fortaleza',
      uf: 'CE',
      degree: 'Sistemas e Mídias Digitais',
      age: 20,
    };

    const response = await request(app).put(`/students/${id}`).send(student);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(JSON.stringify({
      error: 'This e-mail does not exist.',
    }));
  });

  test('should not update an existent student with different e-mail', async () => {
    const id = '3';
    const student = {
      name: 'João Gabriel Silva Gomes',
      email: 'joaogabriel@email.com',
      cep: 63870000,
      address: 'Avenida Conde Mota do Vale',
      number: 990,
      neighborhood: 'Uirapuru',
      city: 'Fortaleza',
      uf: 'CE',
      degree: 'Sistemas e Mídias Digitais',
      age: 20,
    };

    const response = await request(app).put(`/students/${id}`).send(student);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(JSON.stringify({
      error: 'This e-mail is already in use.',
    }));
  });

  test('should not update an existent student with a invalid or non-existent degree', async () => {
    const id = '1';
    const student = {
      name: 'João Gabriel Silva Gomes',
      email: 'joaogabriel@email.com',
      cep: 63870000,
      address: 'Avenida Conde Mota do Vale',
      number: 990,
      neighborhood: 'Uirapuru',
      city: 'Fortaleza',
      uf: 'CE',
      degree: 'Psicologia',
      age: 20,
    };

    const response = await request(app).put(`/students/${id}`).send(student);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(JSON.stringify({
      error: 'This degree is invalid or non-exist.',
    }));
  });
});

describe('DELETE Routes', () => {
  test('should delete an existent student by id', async () => {
    const id = '3';

    const response = await request(app).delete(`/students/${id}`);

    expect(response.status).toEqual(204);
  });

  test('should delete a non-existent student by id', async () => {
    const id = '1937891749';

    const response = await request(app).delete(`/students/${id}`);

    expect(response.status).toEqual(204);
  });
});
