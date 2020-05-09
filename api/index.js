utils = require('../service/utils');

module.exports = async (req, res) => {
  console.log('call index');
  try {
    res.send(`${utils.serviceListHTML()}`);
  } catch(e)  {
	console.error(e);
  }
}