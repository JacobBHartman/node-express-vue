// Import modules
var bodyParser       = require('body-parser');
var express          = require('express');
var expressValidator = require('express-validator');

var path             = require('path');
var routes           = require(path.join(__dirname, 'routes/routes.js'))



// Initialize application
var app = express();



// Establish which view engine and where views may be found
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Enable body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Establish absolute path of static resources
app.use(express.static(path.join(__dirname, 'public')));

// Declare global variables
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});

// Enable express-validator middleware
app.use(expressValidator());



// Declare routes
app.use('/', routes);



// Enable server to listen on a port
const port = 3000;
app.listen(port, () => console.log('Server started on port %s...', port));
