exports.whiteList = function(req, res, next) {
  console.log('whitelist');
  console.log(req.body);
};

exports.blackList = function(req, res, next) {
  console.log('blacklist');

};

exports.structure = function(req, res, next) {
  console.log('structure');

};