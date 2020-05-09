var express = require('express');
var router = express.Router();
const path = require('path');

router.get('/toto',  require('../api/toto.js'));
router.get('/a',  require('../api/a.js'));
router.get('/b',  require('../api/b.js'));
router.get('/c',  require('../api/c.js'));


module.exports = router;