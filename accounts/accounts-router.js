const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();

router.get('/', (req, res) => {
  // TODO
  db.select('*')
    .from('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
  // TODO
});

router.post('/', (req, res) => {
  // TODO
  const accountData = req.body;
  db('accounts').insert(accountData, 'id')
    .then(ids => {
      res.status(200).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  // TODO
});

router.delete('/:id', (req, res) => {
  // TODO
});

module.exports = router;