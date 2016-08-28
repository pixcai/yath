var util = require('./util');

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
