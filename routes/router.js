const express = require('express');
const router = express.Router();
const utils = require('../service/utils');
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, '..', 'api');



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


let welcome = async (req, res) => {
  console.info("welcome");
  try {
    res.send(`${utils.serviceListHTML()}`);
  } catch (e) {
    console.error(e);
  }
};
router.get("/", welcome);

module.exports = router;
