module.exports = async (req, res) => {
  
  console.log('call index v2');
  try {
    var utils = require('../service/utils');
	res.send('hello');
    // res.send(`${utils.serviceListHTML()}`);
  } catch(e)  {
	console.error(e);
	res.send('ERR '+e);
  }
}