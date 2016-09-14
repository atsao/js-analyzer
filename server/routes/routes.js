var esprima = require('esprima');
var tester = require('../specs');

var parsed = {};

module.exports = function(app) {
  app.route('/').post(function(req, res) {
    if (req.body.code === undefined) {
      res.status(500).send('Invalid input');
    }

    parsed = esprima.parse(req.body.code, { sourceType: 'script' });

    res.send(JSON.stringify(parsed)); 
  });

  app.route('/whitelist').get(function(req, res) {
    var result = tester.whitelist(parsed);
    res.send(result);
  });

  app.route('/blacklist').get(function(req, res) {
    var result = tester.blacklist(parsed);
    res.send(result);
  });

  app.route('/structure').get(function(req, res) {
    var result = tester.structure(parsed);
    res.send(result);
  });
}