var util = require('./util');
var __assert = require('./func/assert');
var __deepEqual = require('./func/deepEqual');
var __deepStrictEqual = require('./func/deepStrictEqual');

var __failCount = 0;
var __passCount = 0;

var __context = {
  failCount: function(value) {
    if (util.isNumber(value)) {
      __failCount = value;
    }
    return __failCount;
  },
  passCount: function(value) {
    if (util.isNumber(value)) {
      __passCount = value;
    }
    return __passCount;
  },
  totalCount: function() {
    return __failCount + __passCount;
  }
};

__context.options = {
  comment: {
    tag: 'h3',
    style: {
      color: 'black'
    }
  },
  pass: {
    tag: 'p',
    style: {
      margin: 0,
      color: 'green'
    }
  },
  fail: {
    tag: 'p',
    style: {
      margin: 0,
      color: 'red'
    }
  }
};

__context.methods = {
  assert: function(value) {
    return __assert.call(__context, value);
  },
  equal: function (actual, expected) {
    return this.assert(actual == expected);
  },
  deepEqual: function(actual, expected, level) {
    return __deepEqual.call(__context, actual, expected, level);
  },
  strictEqual: function (actual, expected) {
    return this.assert(actual === expected);
  },
  deepStrictEqual: function(actual, expected, level) {
    return __deepStrictEqual.call(__context, actual, expected, level);
  }
};

module.exports = __context;