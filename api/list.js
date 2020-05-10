var dbservice = require('../service/db.js');
//var utils = required('../service/utils');

module.exports = async (req, res) => {
	
  try {
	  console.log('function list');
	  // Get a database connection, cached or otherwise,
	  // using the connection string environment variable as the argument
	  const db = await dbservice.connectToDatabase();
	
	  
	  // Select the "users" collection from the database
	  const collection = await db.collection('movies');
	
	
	  // Select the users collection from the database
	  const movies = await collection.find().limit(3 ).toArray();
	
	  // Respond with a JSON string of all users in the collection
	  res.status(200).json({ movies });
  } catch(e) {
	console.log(e);
    res.send('error ' +e);
  }

}