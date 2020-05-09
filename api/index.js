module.exports = async (req, res) => {
  console.log('hellooooooooooooooooooooo   ', req, res);
  try {
    res.send(`Hello, you just parsed the request body!`)
  } catch(e)  {
	console.log(e);
  }
}