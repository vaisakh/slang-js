const Type = require('./type')
const Symbol = require('./symbol')

function NumericConstantExpression(value) {
  var symbol = new Symbol(null, Type.NUMERIC, parseFloat(value, 10))

  this.evaluate = function(runtimeContext) {
    return symbol
  }

  this.typeCheck = function (compilationContext) {
      return symbol.type
  }

  this.getType = function () {
      return symbol.type
  }
}

module.exports = NumericConstantExpression