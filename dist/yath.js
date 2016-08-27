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
	var methods = __webpack_require__(3);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(1);

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


/***/ },
/* 3 */
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

/***/ }
/******/ ]);