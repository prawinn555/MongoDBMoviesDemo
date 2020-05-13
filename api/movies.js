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

	  const moviesInfo = await findMovies(query);

	  res.status(200).json({ version : 1.01, ...moviesInfo });
  } catch(e) {
	console.log(e);
    utils.sendError(res, 'Error ' +e);
  }

}

let findMovies = async (query) => {
	
	  console.log('findMovies', query);
      let cri = {};
	  if(query.filter) { 
		  cri = JSON.parse( utils.correctJson(query.filter) ) ; 
	  }
      let order = { year : -1};
	  if(query.order) {
		  order = JSON.parse( utils.correctJson(query.order) ) ; 
	  }
      if(typeof cri !== 'object') {
	      cri = {};
      }
      processRegex(cri);
	  let limit = query.limit? parseInt(query.limit) : 3;

	  const db = await dbservice.connectToDatabase();
	  const cursor = db.collection('movies').find(cri);
	
	  const [count, movies] = await Promise.all([cursor.count(), cursor.sort(order).limit(limit ).toArray() ] );
	  return {count, movies};
}



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

