module.exports = async (req, res) => {
  console.log('hellooooooooooooooooooooo   ', req, res);
  try {
    res.send(`Hello v2`)
  } catch(e)  {
	console.log(e);
  }
}