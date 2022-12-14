const Type = require('./type')
const Symbol = require('./symbol')

//To Store Literal string enclosed in Quotes
function StringLiteralExpression(value) {
    var symbol = new Symbol(null, Type.STRING, value)

    this.evaluate = function (runtimeContext) {
        return symbol;
    }

    this.typeCheck = function (compilationContext) {
        return symbol.type;
    }

    this.getType = function () {
        return symbol.type;
    }
}

module.exports = StringLiteralExpression