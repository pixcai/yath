var util = require('./util');

var __context = {
  failCount: 0,
  passCount: 0,
  callOrder: 0
};

var commonStyle = {
  margin: 0,
  lineHeight: 2,
  borderBottom: '1px solid'
};

__context.options = {
  comment: {
    tag: 'h3',
    style: Object.assign({
      padding: '0 .5em',
      color: 'black',
      background: '#ccc'
    }, commonStyle)
  },
  passed: {
    tag: 'p',
    style: Object.assign({
      padding: '0 .5em 0 2em',
      color: 'green'
    }, commonStyle)
  },
  failed: {
    tag: 'p',
    style: Object.assign({
      padding: '0 .5em 0 2em',
      color: 'red'
    }, commonStyle)
  },
  actual: {
    tag: 'span',
    style: {
      color: 'black'
    }
  },
  expected: {
    tag: 'span',
    style: {
      color: 'black'
    }
  }
};

__context.methods = {
  assert: function(value) {
    if (!!value) {
      __context.passCount++;
    } else {
      __context.failCount++;
    }
    __context.callOrder++;

    return !!value;
  },
  equal: function(actual, expected) {
    return this.assert(actual == expected);
  },
  deepEqual: function(actual, expected) {
    return this.assert(util.equal(actual, expected));
  },
  strictEqual: function(actual, expected) {
    return this.assert(actual === expected);
  },
  deepStrictEqual: function(actual, expected) {
    return this.assert(util.strictEqual(actual, expected));
  },
  throws: function(fn, expected) {
    var isThrow = false;

    try {
      if (util.isFunction(fn)) {
        fn();
      }
    } catch (e) {
      if (util.isFunction(expected)) {
        isThrow = expected(e);
      } else if (util.isRegExp(expected)) {
        isThrow = expected.test(e.toString());
      }
    }

    return this.assert(isThrow);
  }
};

module.exports = __context;
