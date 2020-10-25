/* eslint-disable no-underscore-dangle */
const mongoConnect = require('../../src/services/connect');

let service = null;
let closeConn = null;

jest.useFakeTimers();

beforeAll(async () => {
  const { studentService, closeConnect } = await mongoConnect(global.__MONGO_URI__);
  service = studentService;
  closeConn = closeConnect;
});

describe('Creating student', () => {
  it('should fail if student is invalid', async () => {
    let student = null;
    let result = await service.createStudent(student);
    expect(result.status).toBe(false);
    expect(Array.isArray(result.result)).toBe(true);

    student = {};
    result = await service.createStudent(student);
    expect(result.status).toBe(false);
    expect(Array.isArray(result.result)).toBe(true);

    student.firstName = 'Abdul';
    result = await service.createStudent(student);
    expect(result.status).toBe(false);
    expect(Array.isArray(result.result)).toBe(true);
    expect(2 + 2).toBe(4);
  });
  it('should create student', async () => {
    const student = {
      firstName: 'Michea',
      lastName: 'Luke',
      email: 'mm@gmail.com',
      university: 'UNN',
      department: 'ece',
      passwordHash: 'sdsdsd',
    };
    const { status, result } = await service.createStudent(student);
    expect(status).toBe(true);
    expect(result._id).toBeDefined();
  });
});

afterAll(async done => {
  closeConn();
  done();
});