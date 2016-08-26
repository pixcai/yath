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