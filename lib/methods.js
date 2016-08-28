var util = require('./util');
var context = require('./context');

function __log(element, tag, message, style) {
  var el = document.createElement(tag);

  el.innerHTML = util.isString(message) ? message : '';
  if (util.isObject(style)) {
    for (var key in style) {
      if (style.hasOwnProperty(key)) {
        el.style[key] = style[key];
      }
    }
  }
  element.appendChild(el);
}

function __assert(value, actual, expected, passmsg, failmsg) {
  if (context.assert.call(this.context, value)) {
    this.pass('#' + this.context.callOrder + ' (status: passed): ' + (passmsg || 'OK'));
  } else {
    if (!failmsg) {
      var expected = util.isRegExp(expected) ? expected.source : JSON.stringify(expected);
      var actual = util.isRegExp(actual) ? actual.source : JSON.stringify(actual);
      var expectedTag = this.context.options.expected.tag;
      var actualTag = this.context.options.actual.tag;

      function __style(style) {
        return Object.keys(style).reduce(function(str, key) {
          return str + key + ':' + style[key] + ';';
        }, '');
      }

      failmsg = 'expected: ';
      failmsg += '<' + expectedTag + ' style=' + __style(this.context.options.expected.style) + '>';
      failmsg += expected + '</' + expectedTag + '>, ';
      failmsg += 'actual: ';
      failmsg += '<' + actualTag + ' style=' + __style(this.context.options.actual.style) + '>';
      failmsg += actual + '</' + actualTag + '>';
    }
    this.fail('#' + this.context.callOrder + ' (status: failed): ' + failmsg);
  }
}

function __wrapper(context, value, actual, expected, passmsg, failmsg) {
  setTimeout(function () {
    __assert.call(context, value, actual, expected, passmsg, failmsg);
  });

  return context;
}

var methods = {
  comment: function(message) {
    var div = document.createElement('div');
    var self = Object.create(this);

    this.exports.appendChild(div);
    self.exports = div;
    __log(
      div,
      this.context.options.comment.tag,
      message,
      this.context.options.comment.style
    );

    return self;
  },
  pass: function(message) {
    return this.print(
      this.context.options.passed.tag,
      message,
      this.context.options.passed.style
    );
  },
  fail: function(message) {
    return this.print(
      this.context.options.failed.tag,
      message,
      this.context.options.failed.style
    );
  },
  print: function(tag, message, style) {
    __log(this.exports, tag, message, style);
    return this;
  }
};

methods.assert =
methods.isOk =
methods.true =
methods.ok =
methods.is = function(value, message) {
  return __wrapper(this, value, value, true, null, message);
};

methods.isNotOk =
methods.notOk =
methods.false = function(value, message) {
  return __wrapper(this, !value, value, false, null, message);
};

methods.isEquals =
methods.isEqual =
methods.equals =
methods.equal = function(actual, expected, message) {
  return __wrapper(this, (actual == expected), actual, expected, null, message);
};

methods.doesNotEquals =
methods.doesNotEqual =
methods.isNotEquals =
methods.isNotEqual =
methods.notEquals =
methods.notEqual = function(actual, expected, message) {
  return __wrapper(this, !(actual == expected), actual, expected, null, message);
};

methods.isEquivalent =
methods.deepEquals =
methods.deepEqual =
methods.same = function(actual, expected, message) {
  return __wrapper(this, util.equal(actual, expected), actual, expected, null, message);
};

methods.isNotEquivalent =
methods.notEquivalent =
methods.isNotDeepEquals =
methods.notDeepEquals =
methods.isNotDeepEqual =
methods.notDeepEqual =
methods.notSame = function(actual, expected, message) {
  return __wrapper(this, !util.equal(actual, expected), actual, expected, null, message);
};

methods.isStrictEquals =
methods.strictEquals =
methods.isStrictEqual =
methods.strictEqual = function(actual, expected, message) {
  return __wrapper(this, (actual === expected), actual, expected, null, message);
};

methods.isNotStrictEquals =
methods.notStrictEquals =
methods.isNotStrictEqual =
methods.notStrictEqual = function(actual, expected, message) {
  return __wrapper(this, !(actual === expected), actual, expected, null, message);
};

methods.isDeepEquivalent =
methods.deepEquivalent =
methods.isDeepStrictEquals =
methods.deepStrictEquals =
methods.isDeepStrictEqual =
methods.deepStrictEqual = function(actual, expected, message) {
  return __wrapper(this, util.strictEqual(actual, expected), actual, expected, null, message);
};

methods.isNotDeepEquivalent =
methods.notDeepEquivalent =
methods.isNotDeepStrictEquals =
methods.notDeepStrictEquals =
methods.isNotDeepStrictEqual =
methods.notDeepStrictEqual = function(actual, expected, message) {
  return __wrapper(this, !util.strictEqual(actual, expected), actual, expected, null, message);
};

function __throws(fn, expected) {
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

  return isThrow;
}

methods.throws = function(fn, expected, message) {
  return __wrapper(this, __throws(fn, expected), /Error/, expected, null, message);
};

methods.doesNotThrow = function(fn, expected, message) {
  return __wrapper(this, !__throws(fn, expected), /Error/, expected, null, message);
};

module.exports = methods;
