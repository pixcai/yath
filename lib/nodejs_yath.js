var util = require('./util');
var context = require('./context');
var methods = require('./methods');

function test(name, options, callback) {
  var __methods = util.clone(methods);

  __methods.context = util.clone(context);
  if (util.isString(name)) {
    if (util.isObject(options)) {
      __methods.context.options = util.assign(__methods.context.options, options);
      if (util.isFunction(callback)) {
        setTimeout(function() {
          callback(__methods);
        });
      }
    } else if (util.isFunction(options)) {
      setTimeout(function() {
        options(__methods);
      });
    }
    __methods.print(
      __methods.context.options.name.tag,
      name,
      __methods.context.options.name.style
    );
  } else if (util.isObject(name)) {
    __methods.context.options = util.assign(__methods.context.options, name);
    if (util.isFunction(options)) {
      setTimeout(function() {
        options(__methods);
      });
    }
  } else if (util.isFunction(name)) {
    setTimeout(function() {
      name(__methods);
    });
  }
}

module.exports = function(element) {
  methods.exports = document.body;
  if (util.isHTMLElement(element)) {
    methods.exports = element;
  }
  methods.test = function(name, options, callback) {
    setTimeout(function() {
      test(name, options, callback);
    });
  };

  return test;
};
