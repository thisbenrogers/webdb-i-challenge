const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();

// * COMPLETE
router.get('/', (req, res) => {
  db.select('*')
    .from('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

// * COMPLETE
router.get('/:id', (req, res) => {
  db.select('*')
  .from('accounts').where('id', '=', req.params.id)
  .first()
  .then(account => {
    res.status(200).json(account);
  })
  .catch(err => {
    res.status(500).json(err);
  })
});

// * COMPLETE
router.post('/', (req, res) => {
  const accountData = req.body;
  db('accounts').insert(accountData, 'id')
    .then(ids => {
      res.status(200).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

// * COMPLETE
router.put('/:id', (req, res) => {
  db('accounts')
  .where({ id: req.params.id })
  .update(req.body)
  .then(count => {
    res.status(200).json(count);
  })
  .catch(err => {
    res.status(500).json(count);
  })
});

// * COMPLETE
router.delete('/:id', (req, res) => {
  db('accounts')
  .where({ id: req.params.id })
  .del(req.body)
  .then(count => {
    res.status(200).json(count);
  })
  .catch(err => {
    res.status(500).json(count);
  })
});

module.exports = router;