var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, '..', 'api');
//passsing directoryPath and callback function

var services = [];
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
	    let s =  file.split('.')[0];
        console.log(`${file} => ${s}`); 
		router.get('/api/' + s,  require('../api/' + file));
		services.push(`<li><a href="/api/${s}">${s}</li>`);
    });
});



let welcome = async (req, res) => {
  console.info("welcome  ", req, res);
  try {
    res.send(`Welcome  the services are <ul>${services.join('')}</ul>`);
  } catch (e) {
    console.error(e);
  }
};

router.get("/", welcome);
router.get("/api/", welcome);


module.exports = router;