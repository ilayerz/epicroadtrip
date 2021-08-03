const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const pool = require('./db.js').getConnection();
const bodyParser = require('body-parser')

// Enable CORS to make request possible with client side
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', (request, response) => {

  const data = {
    'content': "Hello World",
  }
  response.status(200).send(data)
})

let router = require('./routes/router');
app.use('/api-docs', swaggerUi.serve,   swaggerUi.setup(swaggerDocument));
app.use('/', router);
let usersRouter = require('./routes/user');
app.use('/user', usersRouter);


var server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

module.exports = server;
