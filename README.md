
```
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs

mkdir 

npm init
npm install express --save




```
# node-express-vue

## Notes
```
`let` is block-scoped, `var` is function-scoped
`require()` is a core Node module that acts as a wrapper around
    `Module.require`. It allows us to include other modules.
Express.js is a web application framework for Node.js designed for building
    web applications and APIs.
body-parser extracts the body of an incoming request and exposes it to
    req.body, making it easier to interface with.
`path` provides utilities for working with file and directory paths.
`express-validator` is a set of express middleware that wraps 
    `validator.js` validator and sanitizer functions
`mongojs` emulates the official mongodb API by wrapping `mongodb-native`
We instantiate `mongojs` to gain access to our db by passing the
    necessary variables.
We shorten `mongojs.ObjectId` to `ObjectId`
Finally, we must instantiate an `express` server and calling it `app`
    We could also call it `server` or `appserver`.

A web server acts like a function where the input is a request
and the output is a response. Middleware is executed after
the incoming request in the order by which all of the middleware
is specified. Finally the response is given, according to
the route handler of course.

app.set(name, value) sets the `name` to `value`. Any value may be used
    but certain names can be used to configure server behavior. One
    of those special names is `view engine` which in this case is
    embedded javascript.
Another special name is `views` which is a directory for the applications
    views. It can also be an array of directories. We assign to `view`.
    `__dirname` is always the directory in which the currently executing
    script resides. Note that this is different from `.`. So we assigned
    to the value `views` a folder residing in the directory of this file
    called `views`. join() is akin to python `join()`, it combines strings,
    specifically for the `path`.
`app.use()` mounts the specified middleware function at the specified path.
    In our case `path` defaults to `/`. Middleware mounted without a path
    will be executed for every request to the app. `bodyParser.json()`
    parses `json`. `bodyParser.urlencoded` parses `urlencoded` bodies.
    The `extended` option allows us to parse with `querystring` library 
    (false) or the `qs` library (true). We use `querystring` because
    we don't require the advanced features of `qs`, plus `querystring`
    is internal to Node.
`express.static() allows us to specify the directory in which we will store
    our static assets such as images, CSS, and Javascript files.
`res.locals` defines variables (we called our `errors`) that are scoped
    to the current request and its views. `next()` passes control to the
    next matching route.




`app.listen(path, [callback]) starts a UNIX socket and listens for connections
on the given path. It is identical to Node's `http.Server.listen()
```