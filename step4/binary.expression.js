const SlangException = require('./slang.exception')
const Type = require('./type')
const Symbol = require('./symbol')

function BinaryExpression(exp1, exp2, op) {
  var type = null
  this.evaluate = function(runtimeContext) {
    switch (op) {
      case '+':
        evalLeft = exp1.evaluate(runtimeContext)
        evalRight = exp2.evaluate(runtimeContext)

        if((exp1.getType() === Type.STRING) && (exp2.getType() === Type.STRING)) {
          value = evalLeft.value + evalRight.value
          return new Symbol(null, TYPE.STRING, value)
        } else if ((exp1.getType() === Type.NUMERIC) && (exp2.getType() === Type.NUMERIC)) {
          value = evalLeft.value + evalRight.value
          return new Symbol(null, Type.NUMERIC, value)
        } else {
          throw new SlangException('Type Mismatch!');
        }
      case '-':
        evalLeft = exp1.evaluate(runtimeContext)
        evalRight = exp2.evaluate(runtimeContext)

        if ((exp1.getType() === Type.NUMERIC) && (exp2.getType() === Type.NUMERIC)) {
          value = evalLeft.value - evalRight.value
          return new Symbol(null, Type.NUMERIC, value)
        } else {
          throw new SlangException('Type Mismatch!');
        }
      case '/':
        evalLeft = exp1.evaluate(runtimeContext)
        evalRight = exp2.evaluate(runtimeContext)

        if ((exp1.getType() === Type.NUMERIC) && (exp2.getType() === Type.NUMERIC)) {
          value = evalLeft.value / evalRight.value
          return new Symbol(null, Type.NUMERIC, value)
        } else {
          throw new SlangException('Type Mismatch!');
        }
      case '*':
        evalLeft = exp1.evaluate(runtimeContext)
        evalRight = exp2.evaluate(runtimeContext)

        if ((exp1.getType() === Type.NUMERIC) && (exp2.getType() === Type.NUMERIC)) {
          value = evalLeft.value * evalRight.value
          return new Symbol(null, Type.NUMERIC, value)
        } else {
          throw new SlangException('Type Mismatch!');
        }
      default:
        throw new SlangException('Invalid operation!')
    }
  }

  this.typeCheck = function(compilationContext) {
    if(exp1.typeCheck(compilationContext) == exp2.typeCheck(compilationContext) && exp1.typeCheck(compilationContext) === Type.NUMERIC) {
      type = exp1.getType()
    } else {
      throw new SlangException('Type mismatch failure!')
    }
    return type
  }

  this.getType = function() {
    return type
  }
}

module.exports = BinaryExpression