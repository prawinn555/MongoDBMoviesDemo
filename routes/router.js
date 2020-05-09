var express = require('express');
var router = express.Router();
const path = require('path');

router.get('/api/toto',  require('../api/toto.js'));
router.get('/api/a',  require('../api/a.js'));
router.get('/api/b',  require('../api/b.js'));
router.get('/api/c',  require('../api/c.js'));


module.exports = router;