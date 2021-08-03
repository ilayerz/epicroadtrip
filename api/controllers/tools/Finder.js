const HostelFinder = require("./HostelFinder");
const RestaurantsFinder = require("./RestaurantsFinder");
const DrinkFinder = require("./DrinkFinder");
const TransportFinder = require("./TransportFinder");

/**
 * Finder Class
 * This class use other finder classes
 * All finder's classes used to work with the same structure
 */
class Finder {

    constructor() {
        const hostelFinder = new HostelFinder();
        const restaurantsFinder = new RestaurantsFinder();
        const drinkFinder = new DrinkFinder();
        const transportFinder = new TransportFinder();
        // List all the finders
        this.finders = [
            {
                // parameter send to identify goal of the search
                flag: "hostel",
                // get the response of an external api call
                find: hostelFinder.search,
                // format a given response
                parse: hostelFinder.parse
            },
            {
                flag: "restaurants",
                find: restaurantsFinder.search,
                parse: restaurantsFinder.parse
            },
            {
                flag: "drink",
                find: drinkFinder.search,
                parse: drinkFinder.parse
            },
            {
                flag: "transport",
                find: transportFinder.search,
                parse: transportFinder.parse
            }
        ]

    }


    /**
     * Execute a finder with given parameters and return formatted object
     * @param {Object} finder 
     * @param {float} lat 
     * @param {float} lng 
     * @param {integer} radius 
     * @returns {Promise}
     */
    async execute(finder, lat, lng, radius) {

        const response = await finder.find(lat, lng, radius)

        if (response == undefined) {
            return [];
        }

        const content = await finder.parse(response.body);
        return content;
    }

    /**
     * 
     * @param {string} flag 
     * @param {float} lat 
     * @param {float} lng 
     * @param {integer} radius 
     */
    search(flag, lat, lng, radius) {

        if (flag === undefined || lat === undefined || lng === undefined || radius === undefined)
            return [];

        let finder = undefined;

        for (let i = 0; i < this.finders.length; i++) {
            finder = this.finders[i]
            if (finder.flag == flag) {
                return new Promise((resolve, reject) => {
                    this.execute(finder, lat, lng, radius)
                        .then((content) => {
                            resolve(content)
                        })
                })
            }
        }

        return [];
    }

}

module.exports = Finder;
