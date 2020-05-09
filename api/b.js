module.exports = async (req, res) => {
  console.log('function B');
  try {
    res.send(`Function B  v2 !!!!`)
  } catch(e)  {
	console.error(e);
  }
}