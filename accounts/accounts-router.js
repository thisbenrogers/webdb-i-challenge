const express = require('express');

// database access using knex
const db = require('../data/dbConfig');

const router = express.Router();



// works, returns emtpy array initially
router.get('/', (req, res) => {
  const limiter = req.query.limit;
  const sortBy = req.query.sortby;
  const sortDir = req.query.sortdir;
  const getQuery = db.select('*').from('accounts');
  if (limiter && sortBy && sortDir) {
    getQuery
      .limit(+limiter)
      .orderBy(`${sortBy}`, `${sortDir}`)
      .then(accounts => {
        res.status(200).json(accounts);
      })
      .catch(err => {
        res.status(500).json(err);
      })
  } else if (limiter && sortBy) {
    getQuery
      .limit(+limiter)
      .orderBy(`${sortBy}`)
      .then(accounts => {
        res.status(200).json(accounts);
      })
      .catch(err => {
        res.status(500).json(err);
      })
  } else if (sortBy && sortDir) {
    getQuery
    .orderBy(`${sortBy}`, `${sortDir}`)
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json(err);
    })
  } else if (limiter) {
    getQuery
      .limit(+limiter)
      .then(accounts => {
        res.status(200).json(accounts);
      })
      .catch(err => {
        res.status(500).json(err);
      })
  } else {
    getQuery
      .then(accounts => {
        res.status(200).json(accounts);
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }
});

// works
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


// Works, requires a JSON body with the following object:
// {
//   "name": "string",
//   "budget": numeric
// }
router.post('/', (req, res) => {
  const accountData = req.body;
  db('accounts').insert(accountData, 'id')
  // same as db.insert(postDate, 'id).into('posts)
    .then(ids => {
      res.status(200).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

// Works, requires a JSON body with the following object:
// {
//   "id": numeric
//   "name": "string",
//   "budget": numeric
// }
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

// works
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