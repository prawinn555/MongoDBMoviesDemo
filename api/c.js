module.exports = async (req, res) => {
  console.error('function c err  ', req, res);
  console.info('function c  info  ', req, res);
  console.log('function c   ', req, res);
  try {
    res.send(`function c  v2 !!!!`)
  } catch(e)  {
	console.error(e);
  }
}