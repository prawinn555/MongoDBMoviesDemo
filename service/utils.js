
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


module.export = { 
	sendOk : sendOk,
	sendError : sendError,
	executeSqlChange : executeSqlChange, 
 };