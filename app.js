var
    express      = require('express'),
    http         = require('http'),
    path         = require('path'),
    favicon      = require('static-favicon'),
    logger       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    pg           = require('pg'),
    routes       = require('./routes'),
    users        = require('./routes/user')
;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// app.get('/', routes.index);
app.get('/', function (req, res) {
    queryDB("SELECT * FROM USERS", function (result) {
        console.log("Result: ", result);
        res.render('index', {rows: result.rows} );
    });
});
app.get('/users', users.list);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

function queryDB( query, cc ) {
    var client = new pg.Client( "postgres://postgres:qfefasdF234%@localhost:5433/postgres" );
    client.connect( function(err) {
        if(err) {
            return console.log("Could not connect", err);
        }

        client.query(query, function (err, result) {
            if(err) {
                return console.log("Could not query", err);
            }
            cc(result);

            client.end();
        });
    });
}




app.get('/users', function (req, res) {
    //get list of users : JSON
    queryDB("SELECT * FROM USERS", function (result) {
        console.log("Result: ", result);
        res.send({rows: result.rows});
    });
});
app.get('/users/:id', function (req, res) {
    //Get specific user
});
app.post('/users/:id', function (req, res) {
    //save specific user
});
app.put('/users/:id', function (req, res) {
    //save specific user
});

app.get('/', function (req, res) {

});



module.exports = app;
