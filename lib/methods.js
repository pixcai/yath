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

function __wrapper(value, actual, expected, passmsg, failmsg) {
  var msg = '';

  if (value) {
    msg = passmsg || 'OK';
    this.pass('#' + context.callOrder + ' (status: passed): ' + msg);
  } else {
    if (failmsg) {
      msg = failmsg;
    } else {
      var expected = util.isRegExp(expected) ? expected.source : JSON.stringify(expected);
      var actual = util.isRegExp(actual) ? actual.source : JSON.stringify(actual);
      var expectedTag = context.options.expected.tag;
      var actualTag = context.options.actual.tag;

      function __style(style) {
        return Object.keys(style).reduce(function (str, key) {
          return str + key + ':' + style[key] + ';';
        }, '');
      }

      msg += 'expected: ';
      msg += '<' + expectedTag + ' style=' + __style(context.options.expected.style) +'>';
      msg += expected + '</' + expectedTag + '>, ';
      msg += 'actual: ';
      msg += '<' + actualTag + ' style=' + __style(context.options.actual.style) + '>';
      msg += actual + '</' + actualTag + '>';
    }
    this.fail('#' + context.callOrder + ' (status: failed): ' + msg);
  }

  return this;
}

var methods = {
  comment: function(message) {
    var div = document.createElement('div');
    var self = Object.create(this);

    this.exports.appendChild(div);
    self.exports = div;
    __log(
      div,
      context.options.comment.tag,
      message,
      context.options.comment.style
    );

    return self;
  },
  pass: function(message) {
    return this.print(
      context.options.passed.tag,
      message,
      context.options.passed.style
    );
  },
  fail: function(message) {
    return this.print(
      context.options.failed.tag,
      message,
      context.options.failed.style
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
  return __wrapper.call(
    this,
    context.methods.assert(value),
    value,
    true,
    null,
    message
  );
};

methods.isNotOk =
methods.notOk =
methods.false = function(value, message) {
  return __wrapper.call(
    this, 
    context.methods.assert(!value), 
    value, 
    false, 
    null, 
    message
  );
};

methods.isEquals =
methods.isEqual =
methods.equals =
methods.equal = function(actual, expected, message) {
  return __wrapper.call(
    this, 
    context.methods.equal(actual, expected), 
    actual, 
    expected, 
    null, 
    message
  );
};

methods.doesNotEquals =
methods.doesNotEqual =
methods.isNotEquals =
methods.isNotEqual =
methods.notEquals =
methods.notEqual = function(actual, expected, message) {
  return __wrapper.call(
    this, 
    !context.methods.equal(actual, expected), 
    actual, 
    expected, 
    null, 
    message
  );
};

methods.isEquivalent =
methods.deepEquals =
methods.deepEqual =
methods.same = function(actual, expected, message) {
  return __wrapper.call(
    this, 
    context.methods.deepEqual(actual, expected), 
    actual, 
    expected, 
    null, 
    message
  );
};

methods.isNotEquivalent =
methods.notEquivalent =
methods.isNotDeepEquals =
methods.notDeepEquals =
methods.isNotDeepEqual =
methods.notDeepEqual =
methods.notSame = function(actual, expected, message) {
  return __wrapper.call(
    this, 
    !context.methods.deepEqual(actual, expected), 
    actual, 
    expected, 
    null, 
    message
  );
};

methods.isStrictEquals =
methods.strictEquals =
methods.isStrictEqual =
methods.strictEqual = function(actual, expected, message) {
  return __wrapper.call(
    this, 
    context.methods.strictEqual(actual, expected), 
    actual, 
    expected, 
    null, 
    message
  );
};

methods.isNotStrictEquals =
methods.notStrictEquals =
methods.isNotStrictEqual =
methods.notStrictEqual = function(actual, expected, message) {
  return __wrapper.call(
    this, 
    !context.methods.strictEqual(actual, expected), 
    actual, 
    expected, 
    null, 
    message
  );
};

methods.isDeepEquivalent =
methods.deepEquivalent =
methods.isDeepStrictEquals =
methods.deepStrictEquals =
methods.isDeepStrictEqual =
methods.deepStrictEqual = function(actual, expected, message) {
  return __wrapper.call(
    this, 
    context.methods.deepStrictEqual(actual, expected), 
    actual, 
    expected, 
    null, 
    message
  );
};

methods.isNotDeepEquivalent =
methods.notDeepEquivalent =
methods.isNotDeepStrictEquals =
methods.notDeepStrictEquals =
methods.isNotDeepStrictEqual =
methods.notDeepStrictEqual = function(actual, expected, message) {
  return __wrapper.call(
    this, 
    !context.methods.deepStrictEqual(actual, expected), 
    actual, 
    expected, 
    null, 
    message
  );
};

methods.throws = function(fn, expected, message) {
  return __wrapper.call(
    this, 
    context.methods.throws(fn, expected), 
    /Error/, 
    expected, 
    null, 
    message
  );
};

methods.doesNotThrow = function(fn, expected, message) {
  return __wrapper.call(
    this, 
    !context.methods.throws(fn, expected), 
    /Error/, 
    expected, 
    null, 
    message
  );
};

module.exports = methods;