function NumericConstantExpression(value) {
  this.evaluate = function(runtimeContext) {
    return value
  }
}

module.exports = NumericConstantExpression