const Symbol = require('./symbol')
const Type = require('./type')

function BooleanConstantExpression(value) {
    var symbol = new Symbol(null, Type.BOOLEAN, value)

    this.evaluate = function (runtimeContext) {
        return symbol;
    }

    this.typeCheck = function (compilationContext) {
        return symbol.type
    }
    
    this.getType = function () {
        return symbol.type
    };

}

module.exports = BooleanConstantExpression