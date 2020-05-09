var fs = require('fs');
var dbFile = './sqlite.db';

var exists;
var sqlite3 ;
var db;

try {
  exists = fs.existsSync(dbFile);
  sqlite3 = require('sqlite3').verbose();
  db =  new sqlite3.Database(dbFile); 

	db.serialize(function(){
	  if (!exists) {
		let sql = `CREATE TABLE mydata (id TEXT, type TEXT, description TEXT, content TEXT)`;
	    db.run(sql);
	    console.log('Runing SQL', sql);
	    
	    var sql = `INSERT INTO mydata (id, type, description) VALUES 
	          ("1", "test", "test"), 
	          ("2", "test", "test"),
	          ("3", "test", "test")
	          `;
	    db.serialize(function() {
	      db.run(sql);
	    });
	  } else {
	    console.log('Database ready to go!');
	    console.log('Its content is the following : ');
	    db.each('SELECT * from mydata', function(err, row) {
	      if ( row ) {
	        console.log('record:', row); 
	      }
	    });
	  }
	});
} catch(e) {
  console.log('erreur init DB', e);
}



// Export the model
module.exports = db;