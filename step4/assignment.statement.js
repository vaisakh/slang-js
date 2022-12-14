const VariableExpression = require('./variable.expression')

function AssignmentStatement(exp) {
    var variable = null;
    this.setVariable = function (newVariable) {
        variable = newVariable
    }

    this.setSymbol = function (symbol) {
        variable = new VariableExpression(symbol)
    }

    this.execute = function (runtimeContext) {
        var value = exp.evaluate(runtimeContext)
        runtimeContext.getSymbolTable().assignToTable(variable, value)
        return null;
    }
}

module.exports = AssignmentStatement