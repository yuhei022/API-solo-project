const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { setupServer } = require('../src/server');
chai.should();
const expect = chai.expect;

const server = setupServer();

describe('Employee API', () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  describe('GET /api/employees', () => {
    it('should return all employee', async () => {
      const res = await request.get('/api/employees');
      const answer = [
        {
          id: 1,
          name: 'Ichiro Tanaka',
          age: 30,
        },
        {
          id: 2,
          name: 'Jiro Yamada',
          age: 41,
        },
        {
          id: 3,
          name: 'Saburo Sato',
          age: 28,
        },
      ];
      JSON.parse(res.text).should.deep.equal(answer);
    });
  });

  describe('GET /api/employees with query[limit] ', () => {
    it('should return limited employee', async () => {
      const res = await request.get('/api/employees').query({ limit: 1 });
      const answer = [
        {
          id: 1,
          name: 'Ichiro Tanaka',
          age: 30,
        },
      ];
      JSON.parse(res.text).should.deep.equal(answer);
    });

    it('should return with 400 status when query parameter is invalid', async () => {
      const res = await request.get('/api/employees').query({ limit: 'abc' });
      res.should.have.status(400);
    });
  });

  describe('GET /api/employees/:id', () => {
    it('should return selected employee', async () => {
      const res = await request.get('/api/employees/2');
      const answer = [
        {
          id: 2,
          name: 'Jiro Yamada',
          age: 41,
        },
      ];
      JSON.parse(res.text).should.deep.equal(answer);
    });

    it('should return with 404 status when requested employee is not found', async () => {
      const res = await request.get('/api/employees/10');
      res.should.have.status(404);
    });
  });

  describe('POST /api/employees', () => {
    it('should add employee', async () => {
      const res = await request.post('/api/employees').send({
        id: 4,
        name: 'Shiro Hashimoto',
        age: 26,
      });
      res.should.have.status(201);
      JSON.parse(res.text).should.deep.equal([
        {
          id: 4,
          name: 'Shiro Hashimoto',
          age: 26,
        },
      ]);
    });

    it('should return with 400 status when requested parameter is invalid', async () => {
      const res = await request.post('/api/employees').send({
        id: 10,
        age: 26,
      });
      res.should.have.status(400);
    });
  });

  describe('PATCH /api/employees/:id', () => {
    it('should modify employee', async () => {
      const res = await request.patch('/api/employees/3').send({
        name: 'Saburo Modified',
      });
      JSON.parse(res.text).should.deep.equal(3);
    });

    it('should return with 404 status when requested employee is not found', async () => {
      const res = await request.patch('/api/employees/50').send({
        name: 'Hamtaro',
      });
      res.should.have.status(404);
    });
  });

  describe('PUT /api/employees/:id', () => {
    it('should modify employee if requested employee exists', async () => {
      const res = await request.put('/api/employees/1').send({
        name: 'Ultra man',
        age: 10000,
      });
      JSON.parse(res.text).should.deep.equal(1);
    });

    it('should add employee if requested employee does not exist', async () => {
      const res = await request.put('/api/employees/999').send({
        name: 'Darth Vader',
      });
      JSON.parse(res.text).should.deep.equal([
        {
          id: 999,
          name: 'Darth Vader',
          age: null,
        },
      ]);
    });
  });

  describe('DELETE /api/employees/:id', () => {
    it('should delete employee', async () => {
      const res = await request.delete('/api/employees/2');
      JSON.parse(res.text).should.deep.equal(2);
    });

    it('should return with 404 status when requested employee is not found', async () => {
      const res = await request.delete('/api/employees/100');
      res.should.have.status(404);
    });
  });
});
