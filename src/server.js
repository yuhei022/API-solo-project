const express = require('express');
const knex = require('./knex');

const app = express();

const setupServer = () => {
  app.use(express.json());

  app.get('/api/employees', async (req, res) => {
    const limit = req.query.limit;
    if (limit) {
      if (isNaN(limit)) {
        return res.status(400).end();
      } else {
        const employees = await knex.select('*').from('employee').limit(limit);
        return res.send(employees);
      }
    } else {
      const employees = await knex.select('*').from('employee');
      return res.send(employees);
    }
  });

  app.get('/api/employees/:id', async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
      return res.status(404).end();
    } else {
      const employee = await knex
        .select('*')
        .from('employee')
        .where({ id: id });
      if (employee.length === 0) {
        return res.status(404).end();
      }
      return res.send(employee);
    }
  });

  app.post('/api/employees', async (req, res) => {
    const employeeToAdd = req.body;
    try {
      const result = await knex('employee')
        .insert(employeeToAdd)
        .returning('*');

      res.status(201);
      return res.send(result);
    } catch (error) {
      res.status(400);
      return res.send('invalid parameter');
    }
  });

  app.patch('/api/employees/:id', async (req, res) => {
    const id = req.params.id;
    const info = req.body;

    if (isNaN(id)) {
      return res.status(404).end();
    } else {
      const employee = await knex
        .select('*')
        .from('employee')
        .where({ id: id });
      if (employee.length === 0) {
        return res.status(404).end();
      }
      try {
        const result = await knex('employee')
          .where({ id: id })
          .update(info)
          .then(() => id);
        res.send(result);
      } catch (error) {
        res.status(400);
        return res.send('invalid parameter');
      }
    }
  });

  app.put('/api/employees/:id', async (req, res) => {
    const id = req.params.id;
    let info = req.body;

    if (isNaN(id)) {
      return res.status(400).end();
    } else {
      const employee = await knex
        .select('*')
        .from('employee')
        .where({ id: id });
      if (employee.length === 0) {
        try {
          if (info.id === undefined) {
            info.id = id;
          }
          const result = await knex('employee').insert(info).returning('*');

          res.status(201);
          return res.send(result);
        } catch (error) {
          res.status(400);
          return res.send('invalid parameter');
        }
      } else {
        try {
          const result = await knex('employee')
            .where({ id: id })
            .update(info)
            .then(() => id);
          res.send(result);
        } catch (error) {
          res.status(400);
          return res.send('invalid parameter');
        }
      }
    }
  });

  app.delete('/api/employees/:id', async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
      return res.status(404).end();
    } else {
      const employee = await knex
        .select('*')
        .from('employee')
        .where({ id: id });
      if (employee.length === 0) {
        return res.status(404).end();
      }
      const result = await knex('employee')
        .where({ id: id })
        .del()
        .then(() => id);
      return res.send(result);
    }
  });

  return app;
};

module.exports = { setupServer };
