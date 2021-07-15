require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors())

var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-bwkc1q2n.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://dev-bwkc1q2n.us.auth0.com/api/v2/',
  issuer: 'https://dev-bwkc1q2n.us.auth0.com/',
  algorithms: ['RS256']
});

// app.use(jwtCheck);
app.post('/quiz', jwtCheck, function(req, res,next) {
    next()
});

app.delete('/quiz', jwtCheck, function(req, res,next) {
    next()
});

app.get('/quiz-all', jwtCheck, function(req, res, next) {
    next()
});

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/', require('./quiz/quizs.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
