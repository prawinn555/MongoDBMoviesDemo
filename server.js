
const express = require('express');
const app = express(); 


require('dotenv').config();
const router = require('./routes/router'); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE, HEAD");
  next();
});


// map paths to different functions
app.use('/', router);


var dbservice = require('./service/db.js');
//var utils = required('../service/utils');

// Get a database connection, cached or otherwise,
// using the connection string environment variable as the argument
let testDB = async () => {
	console.log('Test DB');
	const db = await dbservice.connectToDatabase();
	// see http://mongodb.github.io/node-mongodb-native/3.1/api/Db.html#listCollections
	let col = await db.listCollections({}, { nameOnly : true}).toArray();
	console.log('db collections', col);	
}	

testDB();	

let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
