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

  return el;
}

function __wrapper(value, initmsg, message) {
  var msg = util.isString(message) ? message : initmsg;

  if (value) {
    this.pass(msg);
  } else {
    this.fail(msg);
  }
}

module.exports = {
  assert: function(value, message) {
    __wrapper.call(
      this,
      context.methods.assert(value),
      'ok assert',
      message
    );
  },
  equal: function(actual, expected, message) {
    __wrapper.call(
      this,
      context.methods.equal(actual, expected),
      'ok equal',
      message
    );
  },
  deepEqual: function(actual, expected, message) {
    __wrapper.call(
      this,
      context.methods.deepEqual(actual, expected, 0),
      'ok deepEqual',
      message
    );
  },
  strictEqual: function(actual, expected, message) {
    __wrapper.call(
      this,
      context.methods.strictEqual(actual, expected),
      'ok strictEqual',
      message
    );
  },
  deepStrictEqual: function(actual, expected) {
    __wrapper.call(
      this,
      context.methods.deepStrictEqual(actual, expected, 0),
      'ok deepStrictEqual',
      message
    );
  },
  comment: function(message) {
    var tag = context.options.comment.tag;
    var style = context.options.comment.style;

    return __log(context.element, tag, message, style);
  },
  pass: function(message) {
    var tag = context.options.pass.tag;
    var style = context.options.pass.style;

    return __log(context.element, tag, message, style);
  },
  fail: function(message) {
    var tag = context.options.fail.tag;
    var style = context.options.fail.style;

    return __log(context.element, tag, message, style);
  }
};
