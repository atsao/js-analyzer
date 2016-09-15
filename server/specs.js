/*
Esprima types:

VariableDeclaration
FunctionDeclaration
ExpressionStatement
BlockStatement
IfStatement
ForStatement
WhileStatement
EmptyStatement
CallExpression

*/

// Whitelist - program should have these
var whitelistSpecs = {
  VariableDeclaration: true,
  ForStatement: true
}

// Blacklist - program should NOT have these
var blacklistSpecs = {
  IfStatement: true,
  WhileStatement: true
};

// Structure - program should have these patterns
var structureSpecs = {
  ForStatement: ['IfStatement']
};

function generateDatatypes(body) {
  var results = {};

  body.forEach(function(element) {
    if (element.body !== undefined && element.body.body !== undefined && element.body.body.length > 0) {
      var nested = [];
      element.body.body.forEach(function(el) {
        nested.push(el.type);
      });
      results[element.type] = nested;
    } else {
      results[element.type] = true;
    }
  });

  return results;
}

function compareSpecs(datatypes, specs, containsFlag) {
  var result  = true;
  var flag = containsFlag ? undefined : !undefined;

  for (var k in specs) {
    if (Array.isArray(specs[k])) {
      if (Array.isArray(datatypes[k]) && datatypes[k].length > 0) {
        specs[k].forEach(function(spec) {
          if (datatypes[k].indexOf(spec) === -1) {
            result = false;
          }
        });
      } else {
        result = false;
      }
    } else if (datatypes[k] === flag) {
      result = false;
    }
  }

  return result;
}

module.exports = {
  whitelist: function(data) {
    var results = {
      tests: Object.keys(whitelistSpecs),
      pass: false
    };
    var dataTypes = generateDatatypes(data.body);
    results.pass = compareSpecs(dataTypes, whitelistSpecs, true);

    return results;
  },

  blacklist: function(data) {
    var results = {
      tests: Object.keys(blacklistSpecs),
      pass: false
    };
    var dataTypes = generateDatatypes(data.body);
    results.pass = compareSpecs(dataTypes, blacklistSpecs, false);

    return results;
  },

  structure: function(data) {
    var results = {
      tests: structureSpecs,
      pass: false
    }
    var dataTypes = generateDatatypes(data.body);
    results.pass = compareSpecs(dataTypes, structureSpecs, true);

    return results;
  }
}