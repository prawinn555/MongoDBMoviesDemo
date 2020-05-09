
const express = require('express');
const app = express(); 

const router = require('./routes/router'); 


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE, HEAD");
  next();
});


// map paths to different functions
app.use('/', router);

let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
