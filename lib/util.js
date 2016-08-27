var util = [
  'Undefined',
  'String',
  'Number',
  'Boolean',
  'Function',
  'Array',
  'Null',
  'Object',
  'RegExp',
  'HTMLElement'
].reduce(function(util, type) {
  var isType = function(value) {
    return RegExp(type).test(Object.prototype.toString.call(value));
  };

  if (type === 'HTMLElement') {
    isType = function(value) {
      return /HTML\S*Element/.test(Object.prototype.toString.call(value));
    };
  }
  util['is' + type] = isType;

  return util;
}, {});

function __compare(fn, actual, expected, callback) {
  var isEqual = true;

  if (util.isArray(actual) && util.isArray(expected)) {
    var actualLength = actual.length;
    var expectedLength = expected.length;

    for (var i = 0; i < expectedLength; i++) {
      if (i < actualLength) {
        if (!__compare(fn, actual[i], expected[i])) {
          isEqual = false;
        }
        if (util.isFunction(callback)) {
          callback(actual[i], expected[i]);
        }
      }
    }
    isEqual = isEqual && (actualLength === expectedLength);
  } else if (util.isObject(actual) && util.isObject(expected)) {
    for (var key in expected) {
      if (expected.hasOwnProperty(key) && actual.hasOwnProperty(key)) {
        if (!__compare(fn, actual[i], expected[i])) {
          isEqual = false;
        }
      } else {
        isEqual = false;
      }
      if (util.isFunction(callback)) {
        callback(actual[key], expected[key]);
      }
    }
    isEqual = isEqual && (Object.keys(actual).length === Object.keys(expected).length);
  } else {
    isEqual = fn(actual, expected);
    if (util.isFunction(callback)) {
      callback(actual, expected);
    }
  }

  return isEqual;
}

util.equal = function(actual, expected, callback) {
  return __compare(function(v1, v2) {
    return v1 == v2;
  }, actual, expected, callback);
};

util.strictEqual = function(actual, expected, callback) {
  return __compare(function(v1, v2) {
    return v1 === v2;
  }, actual, expected, callback);
};

module.exports = util;
