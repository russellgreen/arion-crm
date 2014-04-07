/* GET home page. */
exports.index = function(req, res){
  queryDB("SELECT * FROM Users", function (result) {
	console.log("Result: ", result);
  });
  res.render('index', { title: 'Express' });
};

