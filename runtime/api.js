var rip = require('kreggel-rip');
module.exports = API;

function API (name, version) {
  this._routes = [];
  this.name = name;
  this.app = rip.app;
  this.version = version;
  this.router = rip.router();
}

API.prototype.register = function (route, Endpoint) {
  var router = new Endpoint().setup(route, this);
  this._routes.push ({
    value: route,
    version: this.version
  });
};

API.prototype.routes = function() {
  return this._routes;
};

API.prototype.startup = function (options) {
  this.app.use ('/' + this.name + '/api/' + this.version, this.router);
  if(options && options.print)
    this.print();
};

API.prototype.print = function () {
  console.log ('Printing ' + this._routes.length + ' available routes for API "' + this.name + '"');
  if (this._routes.length > 0) {
    console.log ('---');
  }
  this._routes.forEach (function (route) {
    console.log ('route "' + route.value + '" for api version "' + route.version + '"');
  });
  console.log ('---');
};