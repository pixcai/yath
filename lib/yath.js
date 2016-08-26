var util = require('./util');
var context = require('./context');
var methods = require('./methods');

function test(name, options, callback) {
  if (util.isString(name)) {
    methods.comment(name);
    if (util.isObject(options)) {
      context.options = options;
      if (util.isFunction(callback)) {
        callback(methods);
      }
    } else if (util.isFunction(options)) {
      options(methods);
    }
  } else if (util.isObject(name)) {
    context.options = name;
    if (util.isFunction(options)) {
      options(methods);
    }
  } else if (util.isFunction(name)) {
    name(methods);
  }
}

(function() {
  window.yath = function(element) {
    context.element = document.body;
    if (util.isHTMLElement(element)) {
      context.element = element;
    }
    return test;
  };
})();
