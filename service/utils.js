
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

function later(delay, value) {
    return new Promise(resolve => setTimeout(resolve, delay, value));
}


module.exports = { 
	later,
	sendOk,
	sendError,
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


