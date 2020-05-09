module.exports = async (req, res) => {
  console.log('function TOTO');
  try {
    res.send(`TOTO  v2 !!!!`)
  } catch(e)  {
	console.error(e);
  }
}