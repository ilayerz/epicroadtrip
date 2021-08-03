var unirest = require("unirest");

/**
 * DrinkFinder Class
 */
class DrinkFinder {

    constructor() {
    }

    /**
     * Parse Api request to array format
     * @param {Response.body} body 
     * @returns {Array} Return hostels formatted
     */
    async parse(body) {

        if (body.features == undefined) {
            return []
        }
    
        const elements = body.features
        const bars = []
        let element = undefined;

        for (let i = 0; i < elements.length; i++) {
            element = elements[i]
            let rate =  await DrinkFinder.changeRating(element.properties.rate)
            const bar = {
                position: {
                    lat: element.geometry.coordinates[0],
                    lng: element.geometry.coordinates[1]
                },
                xid: element.properties.xid,
                name: element.properties.name,
                rate: rate,
                distance: element.properties.dist
            }

            bars.push(bar)
        }

        return (bars)
    }

    static changeRating(rate){
        if(rate == "3h" || rate == "3")
            return 10;
        else if(rate == "2h" || rate =="2")
            return 8.5;
        else if(rate == "1h" || rate == "1")
            return 7.5;
        else
            return 6;
    }

    /**
     * Search hostels at location
     * @param {float} lat 
     * @param {float} lng 
     * @param {integer} radius 
     * @returns {Promise} Hostels formatted
     */
    search(lat, lng, radius) {
    
        const API_KEY = process.env["OPENTRIPMAP-KEY"];
        var req = unirest("GET", `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${lng}&lat=${lat}&src_geom=wikidata&src_attr=wikidata&kinds=bars&apikey=${API_KEY}`);

        req.headers({
            "useQueryString": true
        });

        return new Promise((resolve, reject) => {
            req.end((res) => {
                if (res.error) {
                    resolve(undefined)
                }
                resolve(res)
            });
        })
    }
}

module.exports = DrinkFinder;