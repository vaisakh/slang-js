function BinaryExpression(exp1, exp2, op) {
  this.evaluate = function(runtimeContext) {
    switch (op) {
      case '+':
        return exp1.evaluate(runtimeContext) + exp2.evaluate(runtimeContext)
      case '-':
        return exp1.evaluate(runtimeContext) - exp2.evaluate(runtimeContext)
      case '/':
        return exp1.evaluate(runtimeContext) / exp2.evaluate(runtimeContext)
      case '*':
        return exp1.evaluate(runtimeContext) * exp2.evaluate(runtimeContext)
      default:
        throw new SlangException('Invalid operation!')
    }
  }
}

module.exports = BinaryExpression