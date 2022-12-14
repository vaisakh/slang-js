const TYPE = require('./type')
const Symbol = require('./symbol')

function UnaryExpression(exp1, op) {
  this.evaluate = function(runtimeContext) {
    switch(op) {
      case '+':
        var evalLeft = exp1.evaluate(runtimeContext)
        if(evalLeft.type === TYPE.NUMERIC) {
          return new Symbol(null, TYPE.NUMERIC, evalLeft.value)
        } else {
          throw new SlangException('Type Mismatch!')
        }
      case '-':
        var evalLeft = exp1.evaluate(runtimeContext)
        if(evalLeft.type === TYPE.NUMERIC) {
          return new Symbol(null, TYPE.NUMERIC, -evalLeft.value)
        } else {
          throw new SlangException('Type Mismatch!')
        }
      default:
        throw new SlangException('Invalid operation!')
    }
  }

  this.typeCheck = function(compilationContext) {
    var expType = exp1.typeCheck(compilationContext)
    if(expType === TYPE.NUMERIC) {
      return expType
    } else {
      throw new SlangException('Type Mismatch!')
    }
  }
}

module.exports = UnaryExpression