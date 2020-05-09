var express = require('express');
var router = express.Router();
var utils = require('../service/utils');
console.log('utils', utils);
utils.initRouter(router);

let welcome = async (req, res) => {
  console.info("welcome");
  try {
    res.send(`${utils.serviceListHTML()}`);
  } catch (e) {
    console.error(e);
  }
};
router.get("/", welcome);

module.exports = router;
