const VariableExpression = require('./variable.expression')

function VariableDeclarationStatement(symbol) {
    var variable = null
    this.execute = function(runtimeContext) {
        var symbolTable = runtimeContext.getSymbolTable()
        symbolTable.add(symbol)
        variable = new VariableExpression(symbol)
    }
}

module.exports = VariableDeclarationStatement