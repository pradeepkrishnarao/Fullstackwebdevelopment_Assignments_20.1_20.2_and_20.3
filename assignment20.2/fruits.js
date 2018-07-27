var express = require('express');
/* An instance of Express Router is created */
var router = express.Router();
var apifruits = require('./api/fruits.json');
router.get('/', function(req, res){
	res.json(apifruits);
})

router.get('/:id([0-9]{1,})', function(req, res){
	var fruitId = apifruits.filter(function(fruit){
	if(fruit.id == req.params.id){
			return true;
	}
	});
	if(fruitId.length == 1){
		res.json(fruitId[0]);
	} else {
/* Set status to 404 as fruit was not found */
		res.status(404)
		res.json({message: "Not found"});
	}
});
router.post('/', function(req, res){
//Make sure all valid fields are provided
	if(!req.body.name || !req.body.lb || !req.body.price){
		res.status(400);
		res.json({message: "Bad request"});
	}else{
	var newfruitId = apifruits[apifruits.length-1].id+1;
	apifruits.push({
		id: newfruitId,
		name: req.body.name,
		lb: req.body.lb,
		price: req.body.price
	});
	res.json({message: "New fruit item created.", location: "/apifruits/" + newfruitId});
	}
});
router.put('/:id([0-9]{1,})', function(req, res){
//Make sure all valid fields are provided
	if(!req.body.name || !req.body.lb || !req.body.price){
		res.status(400);
		res.json({message: "Bad request"});
	}else {
//Gets us the index of the fruit with given Id
	var updateIndex = apifruits.map(function(fruit){
		return fruit.id;
	}).indexOf(parseInt(req.params.id));

	if(updateIndex == -1){
//Fruit not found, create new
	apifruits.push({
		id: req.params.id,
		name: req.body.name,
		lb: req.body.lb,
		price:req.body.price
	});
	res.json({
		message: "New fruit created.", location: "/apifruits/" + req.params.id});
	}else{
//Update existing fruit
	apifruits[updateIndex] = {
		id: parseInt(req.params.id),
		name: req.body.name,
		lb: req.body.lb,
		price: req.body.price
	};
	res.json({message: "Fruit id " + req.params.id + " updated", location: "/apifruits/" + req.params.id});
	}
	}
});
router.delete('/:id([0-9]{1,})', function(req, res){
	var removeIndex = apifruits.map(function(fruit){
		return fruit.id;
//Gets the index of fruit with given id
	}).indexOf(parseInt(req.params.id));
	if(removeIndex === -1){
		res.json({message: "Not found"});
	}else{
	apifruits.splice(removeIndex, 1);
		res.send({message: "Fruit id " + req.params.id + " removed"});
	}
});
//Router is exported
module.exports = router;