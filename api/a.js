module.exports = async (req, res) => {
  console.error('function a err  ', req, res);
  console.info('function a  info  ', req, res);
  console.log('function a   ', req, res);
  try {
    res.send(`function A  v2 !!!!`)
  } catch(e)  {
	console.error(e);
  }
}