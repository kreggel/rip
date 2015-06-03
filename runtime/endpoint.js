var rip = require('kreggel-rip');
module.exports = Endpoint;

function Endpoint () {
}

Endpoint.prototype.throwMethodNotAllowedError = function () {
  var error = new Error ('Method not allowed');
  error.status = 405;
  throw  error;
};

Endpoint.prototype.throwNotFoundError = function () {
  var error = new Error ('Not found');
  error.status = 404;
  throw  error;
};

Endpoint.prototype.setup = function (path, api) {
  this.api = api;
  var router = api.router;
  var self = this;
  if (typeof router === 'undefined') {
    console.log ('No router has been specified. Instantiating a new one.');
    router = rip.router();
  }

  if (typeof path === 'undefined') {
    path = '';
  }

  router.get (path + '/', function (req, res) {
    res.json (self.findAllItems (req, res));
  });

  router.post (path + '/', function (req, res) {
    res.json (self.createItem (req, res));
  });

  router.head (path + '/:id', function (req, res) {
    var id = req.params.id;
    res.json (self.existsItem (id, req, res));
  });

  router.get (path + '/:id', function (req, res) {
    var id = req.params.id;
    res.json (self.findItemById (id, req, res));
  });

  router.delete (path + '/:id', function (req, res) {
    var id = req.params.id;
    res.json (self.deleteItem (id, req, res));
  });

  router.put (path + '/:id', function (req, res) {
    var id = req.params.id;
    res.json (self.updateItem (id, req, res));
  });

  return router;
};

Endpoint.prototype.createItem = function () {
  this.throwMethodNotAllowedError ();
};

Endpoint.prototype.updateItem = function (id) {
  this.findItemById (id);
  this.throwMethodNotAllowedError ();
};

Endpoint.prototype.deleteItem = function (id) {
  this.findItemById (id);
  this.throwMethodNotAllowedError ();
};

Endpoint.prototype.existsItem = function (id) {
  return this.findItemById (id);
};

Endpoint.prototype.findItemById = function () {
  this.throwNotFoundError ();
};

Endpoint.prototype.findAllItems = function () {
  this.throwMethodNotAllowedError ();
};