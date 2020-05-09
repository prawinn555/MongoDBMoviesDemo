module.exports = async (req, res) => {
  console.log('function C');
  try {
    res.send(`function c  v2 !!!!`)
  } catch(e)  {
	console.error(e);
  }
}