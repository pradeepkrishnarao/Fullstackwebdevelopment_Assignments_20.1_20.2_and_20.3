var express = require('express');
/* An instance of Express Router is created */
var router = express.Router();

router.get('/', function(req, res){
	res.send('GET route on sample.');
});
 router.post('/', function(req, res){
	 res.send('POST route on sample.');
});

//export this router to use in our index.js
module.exports = router;
