module.exports = async (req, res) => {
  console.error('function b err  ', req, res);
  console.info('function b  info  ', req, res);
  console.log('function b   ', req, res);
  try {
    res.send(`Function B  v2 !!!!`)
  } catch(e)  {
	console.error(e);
  }
}