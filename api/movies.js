var dbservice = require('../service/db.js');
var utils = require('../service/utils');
const url = require('url');

var toRegexIfContainSlash = (k, v) =>{
	if(typeof v !== 'string') return v;
	if(v && v.startsWith('/') && v.endsWith('/')) {
		let r = v.substring(1, v.length-1);
		console.log(`criteria ${k} - extraction REGEX ${r}`);
		return new RegExp(r, 'i');
	} else {
		return v;
	}
};
var processRegex = (cri) => {
	Object.getOwnPropertyNames(cri).map( (k) =>
		cri[k] = toRegexIfContainSlash(k, cri[k])
	);
	
};

module.exports = async (req, res) => {
	
  try {
	  utils.prepareHeader(res);
	  const query = url.parse(req.url,true).query;

	  // Select the users collection from the database
	  const movies = await findMovies(query);

	
	  // Respond with a JSON string of all users in the collection
	  res.status(200).json({ version : 1.01, movies });
  } catch(e) {
	console.log(e);
    utils.sendError(res, 'Error ' +e);
  }

}

let findMovies = async (query) => {
	
	  console.log('findMovies', query);
      let cri = {};
	  if(query.filter) { 
		  cri = JSON.parse( correctJson(query.filter) ) ; 
	  }
      if(typeof cri !== 'object') {
	      cri = {};
      }
      processRegex(cri);
	  let limit = query.limit? parseInt(query.limit) : 3;

	  // Get a database connection, cached or otherwise,
	  // using the connection string environment variable as the argument
	  const db = await dbservice.connectToDatabase();
	  // Select the "users" collection from the database
	  const collection = await db.collection('movies');
	
	  return collection.find(cri).limit(limit ).toArray();
}

let correctJson = (s) => {
   let r = s.replace(/['"]?([$a-z0-9A-Z_]+)['"]?\s*:/g, '"$1":')
              // correct simple pattern
            .replace(/(\/[\w\s]+\/)/gi, '"$1"');
   if(s!==r) {
      console.log('correctedJson ',r);
   }
   return r;
};

// test 
let test = async () => {
	let res = await findMovies({
		filter : `{title:/devil/}`,
		limit : "1"
	});
	console.log( 'test res', res);
	


};

if(process.env.RUN_TEST) {
  test();
}

