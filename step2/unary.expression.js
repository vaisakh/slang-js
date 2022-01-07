function UnaryExpression(exp1, op) {
  this.evaluate = function(runtimeContext) {
    switch(op) {
      case '+':
        return exp1.evaluate(runtimeContext)
      case '-':
        return -exp1.evaluate(runtimeContext)
      default:
        throw new SlangException('Invalid operation!')
    }
  }
}

module.exports = UnaryExpression