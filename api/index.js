var utils;
try {
	utils = require('../service/utils');
} catch(e) {
	console.log('error init utils', e)
}

module.exports = async (req, res) => {
  
  console.log('call index');
  try {
    res.send(`${utils.serviceListHTML()}`);
  } catch(e)  {
	console.error(e);
	res.send('ERR '+e);
  }
}