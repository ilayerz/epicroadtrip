const baseUrl = "http://localhost:3000"
const unirest = require("unirest");
const Finder = require('../controllers/tools/Finder');

describe('Server testing: ', () =>{

    var server;
    
    const query = "radius=5000&lat=48.8566969&long=2.3514616";

    const makeRequest = (path) => {
        const req = unirest("GET", `${baseUrl}${path}`);
        
        req.headers({
            "useQueryString": true
        });
    
        return new Promise((resolve, reject) => {
            req.end((res) => {
                resolve(res)
            })
        });
    }

    beforeAll(() => { server = require('../server.js') })

    afterAll(() => { server.close() })

    describe('API Ping:', () => {

        it ("Hello World", async () => {
            const response = await makeRequest('/');
            expect(response.statusCode).toBe(200);
        })
    })

    describe('Unknown Route:', () => {

        it ("unknown", async () => {
            const response = await makeRequest('/unknown');
            expect(response.statusCode).toBe(404);
        })
    })

    describe('Hostels routes:', () => {
        
        it ("Test route", async () => {
            const response = await makeRequest(`/find/hostels?${query}`);
            expect(response.statusCode).toBe(200);
        })
   
        it ("Missing parameter.", async () => {
            const response = await makeRequest('/find/hostels');
            expect(response.statusCode).toBe(400);
        })
        
    })

    describe('Drinks routes:', () => {
        
        it ("Test route", async () => {
            const response = await makeRequest(`/find/drinks?${query}`);
            expect(response.statusCode).toBe(200);
        })

        it ("Missing parameter.", async () => {
            const response = await makeRequest('/find/drinks');
            expect(response.statusCode).toBe(400);
        })
    })

    describe('Events routes:', () => {
        
        it ("Test route", async () => {
            const response = await makeRequest(`/find/events?${query}`);
            expect(response.statusCode).toBe(200);
        })

        it ("Missing parameter.", async () => {
            const response = await makeRequest('/find/events');
            expect(response.statusCode).toBe(400);
        })
    })
    
    describe('Transports routes:', () => {
        
        it ("Test route", async () => {
            const response = await makeRequest(`/find/transports?${query}`);
            expect(response.statusCode).toBe(200);
        })

        it ("Missing parameter.", async () => {
            const response = await makeRequest('/find/transports');
            expect(response.statusCode).toBe(400);
        })
    })

    describe('Restaurants routes:', () => {
        
        it ("Test route", async () => {
            const response = await makeRequest(`/find/restaurants?${query}`);
            expect(response.statusCode).toBe(200);
        })

        it ("Missing parameter.", async () => {
            const response = await makeRequest('/find/restaurants');
            expect(response.statusCode).toBe(400);
        })
    })

    describe('GET /detail?xid=H270729', () => {

        var response = {}

        beforeAll(async () => {
            response = await makeRequest(`/detail?xid=H270729`);
        })

        it("Status 200", () => {
            expect(response.statusCode).toBe(200);
        })

        it("Body", () => {
            var test = {"xid":"H270729","name":"hotel du jeu de paume","address":{"city":"Paris","road":"Rue Saint-Louis en l'Île","state":"Île-de-France","county":"Paris","suburb":"Îles","country":"France","postcode":"75004","country_code":"fr","house_number":"54","city_district":"4e"},"rate":"2h","wikidata":"Q22921944","kinds":"historic_architecture,architecture,accomodations,interesting_places,other_hotels,other_buildings_and_structures","url":"https://www.booking.com/hotel/fr/du-jeu-de-paume.html","sources":{"geometry":"wikidata","attributes":["wikidata","booking.com"]},"stars":4,"otm":"https://opentripmap.com/en/card/H270729","image":"https://commons.wikimedia.org/wiki/File:H%C3%B4tel_du_Jeu_de_Paume.jpg","preview":{"source":"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/H%C3%B4tel_du_Jeu_de_Paume.jpg/266px-H%C3%B4tel_du_Jeu_de_Paume.jpg","height":400,"width":266},"point":{"lon":2.35614,"lat":48.852043}}
            expect(response.body).toEqual(test)
        })
    })

    describe('Finder class testing:', () => {
        
        var finder = {}
        var expected = {}

        beforeAll(() => {
            finder = new Finder();
            expected = require('./expected.json');
        })

        for (var i = 0; i < expected.length; i++) {
            ((test) => {
                it(`Finder class test for: ${test['type']}`, function () {
                    var {type, lat, lng, radius} = test;
                    finder.search(type, lat, lng, radius).then((result) => {
                        expect(result).toBe(test["expected"]);
                    });
                });
            })(expected[i]);
        };
    })
})