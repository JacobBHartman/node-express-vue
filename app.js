/*
 * `let` is block-scoped, `var` is function-scoped
 * `require()` is a core Node module that acts as a wrapper around
 *     `Module.require`. It allows us to include other modules.
 * Express.js is a web application framework for Node.js designed for building
 *     web applications and APIs.
 * body-parser extracts the body of an incoming request and exposes it to
 *     req.body, making it easier to interface with.
 * `path` provides utilities for working with file and directory paths.
 * `express-validator` is a set of express middleware that wraps 
 *     `validator.js` validator and sanitizer functions
 * `mongojs` emulates the official mongodb API by wrapping `mongodb-native`
 * We instantiate `mongojs` to gain access to our db by passing the
 *     necessary variables.
 * We shorten `mongojs.ObjectId` to `ObjectId`
 * Finally, we must instantiate an `express` server and calling it `app`.
 *     We could also call it `server` or `appserver`.
 */

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs')

var db = mongojs('tribeapp', ['people'])
var ObjectId = mongojs.ObjectId;

var app = express();



/*
 * A web server acts like a function where the input is a request
 * and the output is a response. Middleware is executed after
 * the incoming request in the order by which all of the middleware
 * is specified. Finally the response is given, according to
 * the route handler of course.
 * 
 * app.set(name, value) sets the `name` to `value`. Any value may be used
 *     but certain names can be used to configure server behavior. One
 *     of those special names is `view engine` which in this case is
 *     embedded javascript.
 * Another special name is `views` which is a directory for the applications
 *     views. It can also be an array of directories. We assign to `view`.
 *     `__dirname` is always the directory in which the currently executing
 *     script resides. Note that this is different from `.`. So we assigned
 *     to the value `views` a folder residing in the directory of this file
 *     called `views`. join() is akin to python `join()`, it combines strings,
 *     specifically for the `path`.
 * `app.use()` mounts the specified middleware function at the specified path.
 *     In our case `path` defaults to `/`. Middleware mounted without a path
 *     will be executed for every request to the app. `bodyParser.json()`
 *     parses `json`. `bodyParser.urlencoded` parses `urlencoded` bodies.
 *     The `extended` option allows us to parse with `querystring` library 
 *     (false) or the `qs` library (true). We use `querystring` because
 *     we don't require the advanced features of `qs`, plus `querystring`
 *     is internal to Node.
 * `express.static() allows us to specify the directory in which we will store
 *     our static assets such as images, CSS, and Javascript files.
 * `res.locals` defines variables (we called our `errors`) that are scoped
 *     to the current request and its views. `next()` passes control to the
 *     next matching route.
 */

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});

app.use(expressValidator());



/*
 * This section contains our route handlers.
 */

app.get('/', function(request, response){
    db.people.find(function(err, docs) {
        console.log(docs);
        response.render('index', {
            title: 'Family',
            people: docs
        });
    })
});

app.post('/people/add', function(request, response){

    request.checkBody('full_name', 'Full Name is required.').notEmpty();
    request.checkBody('father', 'Father is required.').notEmpty();
    request.checkBody('mother', 'Mother is required.').notEmpty();

    var errors = request.validationErrors();

    if(errors){
        response.render('index', {
            title: 'Family',
            people: people,
            errors: errors
        });
    } else {
        var newPerson = {
            full_name: request.body.full_name,
            father: request.body.father,
            mother: request.body.mother
        }
        db.people.insert(newPerson, function(err, result){
            if(err){
                console.log(err);
            }
            response.redirect('/');
        });
    }
});

app.delete('/people/delete/:id', function(req, res){
    db.people.remove({_id: ObjectId(req.params.id)}, function(err, result){
        if(err){
            console.log(err);
        }
        res.redirect('/');
    });
});



/*
 * `app.listen(path, [callback]) starts a UNIX socket and listens for connections
 * on the given path. It is identical to Node's `http.Server.listen()
 */

app.listen(3000, function(){
    console.log('Server started on port 3000...');
})
