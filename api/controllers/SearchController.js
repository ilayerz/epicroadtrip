var SearchController = {};
var fs = require('fs');
var unirest = require("unirest");
require('dotenv').config()

const Finder = require('./tools/Finder')
const EventsFinder = require('./tools/EventsFinder')


SearchController.findHostels = async (request, response) => {

    const radius = request.query.radius;
    const lat = request.query.lat;
    const long = request.query.long;
  
    if (!lat || !radius || !long)
        return response.status(400).send('Parameters is missing, require: lat, radius, long');
    
    const finder = new Finder();
    const content = await finder.search("hostel", lat, long, radius)

    return response.status(200).send(content);
}

SearchController.findRestaurants = async (request, response) => {

    const radius = request.query.radius;
    const lat = request.query.lat;
    const long = request.query.long;
  
    if (!lat || !radius || !long)
        return response.status(400).send('Parameters is missing')
    
    const finder = new Finder();
    const content = await finder.search("restaurants", lat, long, radius)

    return response.status(200).send(content);
}

SearchController.findDrinks = async (request, response) => {

    const radius = request.query.radius;
    const lat = request.query.lat;
    const long = request.query.long;

    if (!lat || !radius || !long)
        return response.status(400).send('Parameters is missing')

    const finder = new Finder();
    const content = await finder.search("drink", lat, long, radius)

    return response.status(200).send(content);
}

SearchController.findTransports = async (request, response) => {

    const radius = request.query.radius;
    const lat = request.query.lat;
    const long = request.query.long;

    if (!lat || !radius || !long)
        return response.status(400).send('Parameters is missing')

    const finder = new Finder();
    const content = await finder.search("transport", lat, long, radius)

    return response.status(200).send(content);
}

SearchController.getDetail = async (request, response) => {
    const xid = request.query.xid;

    if(!xid)
        return response.status(400).send('Parameters is missing')

    var req = unirest("GET", `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${process.env["OPENTRIPMAP-KEY"]}`);

    req.headers({
        "useQueryString": true
    });


    return new Promise((resolve, reject) => {
        req.end(function (res) {
            // console.log(res.body)
            if (res.error) console.log(res.error)

            return response.status(200).send(res.body);
        });
    })
}



SearchController.getEvents = async function(request, response) {
    const radius = request.query.radius;
    const lat = request.query.lat;
    const long = request.query.long;

    if (!lat || !radius || !long)
        return response.status(400).send('Parameters is missing, require: lat, radius, long');

    const start = request.query.start ? request.query.start  + 'T00:00:00Z' : null;
    const end = request.query.end ? request.query.end + 'T00:00:00Z' : null;

    let date = "";
    if(end && start)
        date = `&startDateTime=${start}&endDateTime=${end}`

    var req = unirest("GET", `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env["TICKETMASTER-KEY"]}&latlong=${lat},${long}&radius=${radius}&unit=km&locale=*&countryCode=FR${date}`);

    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        const events = new EventsFinder();
        return response.status(200).send(events.parse(res.body))
    });
}

module.exports = SearchController;
