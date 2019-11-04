const express = require('express');

const acctRouter = require('./accounts/accounts-router');

const server = express();

server.use(express.json());
server.use('/api/accounts', acctRouter);

server.get('/', (req, res) => {
  res.send('<h1>🚀</h1>');
});


module.exports = server;