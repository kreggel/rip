console.log ('initializing production runtime')
var app = require ('rip').app;
var logger = require ('morgan');
var bodyParser = require ('body-parser');

app.use (logger ('prod'));
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({ extended: false }));

// production error handler
// no stacktraces leaked to user
app.use (function (err, req, res, next) {
  res.status (err.status || 500);
  res.json ({
    message: err.message,
    error: {}
  });
});