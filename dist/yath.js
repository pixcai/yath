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

	util.clone = function(obj) {
	  if (util.isArray(obj)) {
	    var value = [];

	    obj.forEach(function(val, i) {
	      value[i] = util.clone(val);
	    });

	    return value;
	  } else if (util.isObject(obj)) {
	    var value = {};

	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        value[key] = util.clone(obj[key]);
	      }
	    }

	    return value;
	  }

	  return obj;
	};

	util.assign = function(obj, value) {
	  if (util.isObject(obj) && util.isObject(value)) {
	    for (var key in value) {
	      if (value.hasOwnProperty(key)) {
	        if (obj.hasOwnProperty(key)) {
	          obj[key] = util.assign(value[key], obj[key]);
	        } else {
	          obj[key] = value[key];
	        }
	      }
	    }
	  }

	  return obj;
	};

	module.exports = util;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(1);

	var context = {
	  failedCount: 0,
	  passedCount: 0,
	  callOrder: 0
	};

	var commonStyle = {
	  margin: 0,
	  'line-height': 2,
	  'border-bottom': '1px solid'
	};

	context.options = {
	  name: {
	    tag: 'h2',
	    style: {
	      'text-align': 'center'
	    }
	  },
	  comment: {
	    tag: 'h3',
	    style: util.assign({
	      padding: '0 .5em',
	      color: 'black',
	      background: '#ddd'
	    }, commonStyle)
	  },
	  passed: {
	    tag: 'p',
	    style: util.assign({
	      padding: '0 .5em 0 2em',
	      color: 'green'
	    }, commonStyle)
	  },
	  failed: {
	    tag: 'p',
	    style: util.assign({
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

	context.assert = function(value) {
	  if (!!value) {
	    this.passedCount++;
	  } else {
	    this.failedCount++;
	  }
	  this.callOrder++;

	  return !!value;
	};

	module.exports = context;


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


/***/ }
/******/ ]);