var db = require('../service/db.js');
//var utils = required('../service/utils');

module.exports = async (req, res) => {
	

  console.log('function list');

  console.log('find by %j', req.query);

  let typeCriteria = req.query.type;                                                
  let criteria = (typeCriteria===undefined || typeCriteria==='')?  '%' : typeCriteria;
  console.log('criteria '+criteria);
  let sql    = ('true'===req.query.opposite)?
       'SELECT id, type, description from mydata where type not like ?' :
       'SELECT id, type, description from mydata where type like ?';
                                                  

  db.all(sql,[criteria],(err, rows ) => {
    if (err) {
      utils.sendError(res, 'DB error : ' + err);
    } else { 
      console.log(`result find liste ${rows.length} \n %j`, rows);
      
      res.status(200)
      res.send(rows)
    }

  });
}