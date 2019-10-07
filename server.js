const express = require('express');

const AccountRouter = require('./accounts/accounts-router');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use('/api/accounts', AccountRouter);

server.get('/', (req, res) => {
  res.send('<h2>Server running</h2>');
});

module.exports = server;