var util = require('./util');
var context = require('./context');
var methods = require('./methods');

function test(name, options, callback) {
  if (util.isString(name)) {
    methods.print('h2', name, { textAlign: 'center' });
    if (util.isObject(options)) {
      context.options = Object.assign(context.options, options);
      if (util.isFunction(callback)) {
        setTimeout(function() {
          callback(methods);
        });
      }
    } else if (util.isFunction(options)) {
      setTimeout(function() {
        options(methods);
      });
    }
  } else if (util.isObject(name)) {
    context.options = Object.assign(context.options, name);
    if (util.isFunction(options)) {
      setTimeout(function() {
        options(methods);
      });
    }
  } else if (util.isFunction(name)) {
    setTimeout(function() {
      name(methods);
    });
  }
}

module.exports = function (element) {
  methods.exports = document.body;
  if (util.isHTMLElement(element)) {
    methods.exports = element;
  }
  methods.test = test;

  return test;
};
