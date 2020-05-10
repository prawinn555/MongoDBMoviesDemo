
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



const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, '..', 'api');

var services = [];

function initRouter(router) {
	fs.readdirSync(directoryPath).forEach(function (file) {
	     try {
		    let s =  file.split('.')[0];
	        console.log(`init rounter ${file} => ${s}`, file); 
			let f = require('../api/' + file);
			if(s==='index') {
				router.get('/api/',  f);
			} else {
				router.get('/api/' + s,  f);
			}
	    } catch(e) {
		   console.error(`error in loading ${file}`, e);
		}
	});
}


function initPage() {
	console.log('initPage function');
	fs.readdirSync(directoryPath).forEach(function (file) {
	     try {
		    let s =  file.split('.')[0];
	        console.log(`${file} => ${s}`, file); 
			if(s!=='index') {
				services.push(`<li><a href="/api/${s}">${s}</a> - last modified ${
					fs.statSync(path.join(directoryPath, file)).mtime}</li>`);
			}
	    } catch(e) {
		   console.error(`error in loading ${file}`, e);
		   services.push(`<li>${s} - ${e} - last modified ${
					fs.statSync(path.join(directoryPath, file)).mtime}</li>`);
		}
	
	});
}



module.exports = { 
	sendOk,
	sendError,
	initRouter,
	serviceListHTML : () => {
		if(services.length===0) {
			try {
			  console.log('initPage');
			  initPage();
			  console.log('initPage - fin');
	        } catch(e) {
		      console.log('error initPage', e);
	        }
		}
		return `<h1>Welcome !!</h1> <p>the services are <ul>${services.join('')}</ul></p>`},
 };