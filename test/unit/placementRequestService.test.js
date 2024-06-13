/* eslint-disable no-underscore-dangle */
const mongoConnect = require('../../src/services/connect');

let service = null;
let sService = null;
let closeConn = null;

beforeAll(async () => {
  const {
    studentService,
    placementRequestService,
    closeConnect,
  } = await mongoConnect(global.__MONGO_URI__);
  sService = studentService;
  service = placementRequestService;
  closeConn = closeConnect;
});

describe('Adding placement request', () => {
  it('should not add placement request for invalid data', async () => {
    let request = null;
    let result = await service.addPlacementRequest(request);
    expect(result.status).toBe(false);
    expect(Array.isArray(result.result)).toBe(true);

    request = {};
    result = await service.addPlacementRequest(request);
    expect(result.status).toBe(false);
    expect(Array.isArray(result.result)).toBe(true);

    request = { student: 'ersdsd' };
    result = await service.addPlacementRequest(request);
    expect(result.status).toBe(false);
    expect(Array.isArray(result.result)).toBe(true);
  });
  it('should fail for duplicate student request on same year', async () => {
    const student = {
      firstName: 'Johnny',
      lastName: 'Deep',
      email: 'kohn@gmail.com',
      university: 'UNN',
      department: 'ece',
      matricNo: '83793/123',
      passwordHash: 'sdsdsd',
    };
    const { result } = await sService.createStudent(student);
    const request = {
      student: result._id,
      year: 2020,
      department: 'ECE',
      state: 'Abuja',
    };
    let val = await service.addPlacementRequest(request);
    expect(val.status).toBe(true);
    val = await service.addPlacementRequest(request);
    expect(val.status).toBe(false);
    expect(Array.isArray(val.result)).toBe(true);
  });
});

afterAll(async done => {
  closeConn();
  done();
});