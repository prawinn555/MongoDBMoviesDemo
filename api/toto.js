module.exports = async (req, res) => {
  console.error('totoooooooooooooo err  ', req, res);
  console.info('totoooooooooooooo  info  ', req, res);
  console.log('totoooooooooooooo   ', req, res);
  try {
    res.send(`TOTO  !!!!`)
  } catch(e)  {
	console.error(e);
  }
}