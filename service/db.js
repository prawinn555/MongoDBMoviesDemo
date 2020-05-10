

// Import Dependencies
const url = require('url');
const MongoClient = require('mongodb').MongoClient;

// Create cached connection variable
let cachedDb = null;

let config = require('../config');

async function connectToDatabase() {

  let uri = process.env.DB_URI;
  
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb;
  }
  let dbname = config.DB_NAME;

  console.log(`uri ${uri} DB_NAME ${dbname}`);

  // If no connection is cached, create a new one
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true  });

  // Select the database through the connection,
  // using the database path of the connection string
  
  const db = await client.db(dbname);

  // Cache the database connection and return the connection
  cachedDb = db;
  return db;
}

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
module.exports = {
	connectToDatabase
}


