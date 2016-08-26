module.exports = function (value) {
  if (!!value) {
    this.passCount(this.passCount() + 1);
  } else {
    this.failCount(this.failCount() + 1);
  }

  return !!value;
};