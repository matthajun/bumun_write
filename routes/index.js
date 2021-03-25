const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
     res.json({data:{"helo":"안녕 "} });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;