console.log ('initializing app');

var express = require ('express');
var app = express ();
var API = require ('./runtime/api');
var cors = require('cors');
var compression = require('compression');
var methodOverride = require('method-override');

app.use(cors()); //enable cors for the whole service
app.use(compression());
app.use(methodOverride('X-HTTP-Method-Override'));

if (app.get('env') === 'development') {
  require('./runtime/development-runtime');
} else {
  require('./runtime/production-runtime');
}

module.exports = {
  app: app,
  api: function(name, version) {
    return new API(name, version);
  },
  router: function() {
    return express.Router();
  },
  defaultErrorHandler: function() {
    // catch 404 and forward to error handler
    app.use (function (req, res, next) {
      var err = new Error ('Not Found');
      err.status = 404;
      next (err);
    });
  }
};
