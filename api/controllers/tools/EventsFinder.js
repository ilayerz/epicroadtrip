var unirest = require("unirest");

/**
 * EventsFinder Class
 */
class EventsFinder {

    constructor() {
    }

    /**
     * Parse Api request to array format
     * @param {Response.body} body
     * @returns {Array} Return hostels formatted
     */
    parse(body) {
        if (body._embedded == undefined) {
            return []
        }

        const elements = body._embedded.events
        const events = []
        let element = undefined;

        for (let i = 0; i < elements.length; i++) {
            element = elements[i]
            const event = {
                name: element.name,
                url: element.url,
                images: element.images,
                distance: element.distance,
                units: element.units,
                dates: element.dates,
                classification: element.classification,
                prices: element.priceRanges,
                venues: element._embedded.venues
            }

            events.push(event)
        }

        return (events)
    }
}

module.exports = EventsFinder;
