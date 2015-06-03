console.log ('initializing development runtime')
var app = require ('rip').app;
var logger = require ('morgan');
var bodyParser = require ('body-parser');

app.use (logger ('dev'));
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({ extended: false }));

// error handlers
// development error handler
// will print stacktrace
app.use (function (err, req, res, next) {
  res.status (err.status || 500);
  res.json ({
    message: err.message,
    error: err
  });
});