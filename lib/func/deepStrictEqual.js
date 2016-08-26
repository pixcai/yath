var util = require('../util');

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