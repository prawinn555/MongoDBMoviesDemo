
function sendError(response, err) {
   console.info(err);
   response.send({ 
      status : 'ERR', 
      message : '' +err });
}

function sendOk(response, msg) {
   response.send({ 
      status : 'OK', 
      message : msg });
}

var db = require('./db.js');
/**  
 * return Promise (number of lines changed) 
 * or throw error
 */
async function executeSqlChange(sql, params) {

  return await new Promise(function(resolve, reject) {
    // console.log('SQL', sql);
    db.run(sql, params? params : [], function(err) {
      if (err) {
        
        reject(err.message);
      } else {
        console.log(`result of ${sql} => changes ${this.changes}`) ;
        resolve({
          status : 'OK',
          changes : this.changes});
      }
    });
  });
}




const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, '..', 'api');

var services = [];

function initRouter(router) {
	fs.readdirSync(directoryPath).forEach(function (file) {
	     try {
		    let s =  file.split('.')[0];
	        console.log(`${file} => ${s}`, file); 
			let f = require('../api/' + file);
	
			
			if(s==='index') {
				if(router) {
					router.get('/api/',  f);
				}
			} else {
				if(router) {
					router.get('/api/' + s,  f);
				}
				services.push(`<li><a href="/api/${s}">${s}</a> - last modified ${
					fs.statSync(path.join(directoryPath, file)).mtime}</li>`);
			}
	    } catch(e) {
		   console.error(`erreur in loading ${file}`, e);
		   services.push(`<li>${s} - ${e} - last modified ${
					fs.statSync(path.join(directoryPath, file)).mtime}</li>`);
		}
	
	});
}


module.exports = { 
	sendOk,
	sendError,
	executeSqlChange, 
	initRouter,
	serviceListHTML : () => {
		if(services.length===0) {
			initRouter();
		}
		return `<h1>Welcome !!</h1> <p>the services are <ul>${services.join('')}</ul></p>`},
 };