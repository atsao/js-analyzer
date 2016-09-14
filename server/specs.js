var whitelistSpecs = {
  VariableDeclaration: true,
  ExpressionStatement: false,
  IfStatement: false,
  ForStatement: true,
  WhileStatement: false
};

var blacklistSpecs = {
  VariableDeclaration: false,
  ExpressionStatement: false,
  IfStatement: true,
  ForStatement: false,
  WhileStatement: true
};

module.exports = {
  whitelist: function(data) {
    var results = {
      tests: [],
      pass: true
    };
    var dataTypes = {};

    data.body.forEach(function(element) {
      dataTypes[element.type] = 1;
    });

    console.log(dataTypes);

    for (var k in whitelistSpecs) {
      if (whitelistSpecs[k]) {
        results.tests.push(k);
      }
      if (dataTypes[k] === undefined && whitelistSpecs[k]) {
        results.pass = false;
      }
    }

    return results;
  },

  blacklist: function(data) {

  }
}