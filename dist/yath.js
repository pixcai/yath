module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(1);
	var context = __webpack_require__(2);
	var methods = __webpack_require__(6);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = [
	  'Undefined',
	  'String',
	  'Number',
	  'Boolean',
	  'Function',
	  'Null',
	  'Object',
	  'HTMLElement'
	].reduce(function(util, type) {
	  var isType = function(value) {
	    return typeof value === type.toLowerCase();
	  };

	  if (type === 'HTMLElement') {
	    isType = function(value) {
	      var isHTMLElement = /HTML/.test(Object.prototype.toString.call(value));

	      return util.isObject(value) && isHTMLElement;
	    };
	  }
	  if (type === 'Null') {
	    isType = function(value) {
	      return value === null;
	    };
	  }
	  if (type === 'Object') {
	    isType = function(value) {
	      return !util.isNull(value) && typeof value === 'object';
	    };
	  }
	  util['is' + type] = isType;

	  return util;
	}, {});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(1);
	var __assert = __webpack_require__(3);
	var __deepEqual = __webpack_require__(4);
	var __deepStrictEqual = __webpack_require__(5);

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

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function (value) {
	  if (!!value) {
	    this.passCount(this.passCount() + 1);
	  } else {
	    this.failCount(this.failCount() + 1);
	  }

	  return !!value;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(1);

	module.exports = function (actual, expected, level) {
	  var isEqual = true;

	  if (util.isObject(actual) && util.isObject(expected)) {
	  	if (!this.methods.strictEqual(actual, expected)) {
		    for (var key in expected) {
		      if (expected.hasOwnProperty(key) && actual.hasOwnProperty(key)) {
		        if(!this.methods.deepEqual(actual[key], expected[key], level + 1)) {
		        	isEqual = false;
		        }
		      }
		      if (!isEqual) break;
		    }
	  	}
	  	return (level === 0) ? this.methods.assert(true) : true;
	  }
	  isEqual = (actual == expected);

	  return (level === 0) ? this.methods.assert(isEqual) : isEqual;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(1);

	module.exports= function (actual, expected, level) {
	  var isEqual = true;

	  if (util.isObject(actual) && util.isObject(expected)) {
	  	if (!this.methods.strictEqual(actual, expected)) {
		    for (var key in expected) {
		      if (expected.hasOwnProperty(key) && actual.hasOwnProperty(key)) {
		        if(!this.methods.deepStrictEqual(actual[key], expected[key], level + 1)) {
		        	isEqual = false;
		        }
		      }
		      if (!isEqual) break;
		    }
	  	}
	  	return (level === 0) ? this.methods.assert(true) : true;
	  }
	  isEqual = (actual === expected);

	  return (level === 0) ? this.methods.assert(isEqual) : isEqual;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(1);
	var context = __webpack_require__(2);

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


/***/ }
/******/ ]);