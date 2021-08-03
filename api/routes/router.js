var express = require('express');
var router = express.Router();

var SearchController = require("../controllers/SearchController");

router.get('/find/hostels', SearchController.findHostels);
router.get('/find/restaurants', SearchController.findRestaurants);
router.get('/find/drinks', SearchController.findDrinks);
router.get('/find/transports', SearchController.findTransports);

router.get('/detail', SearchController.getDetail);
router.get('/find/events', SearchController.getEvents)


module.exports = router;