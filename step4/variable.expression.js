const Type = require('./type')
const Symbol = require('./symbol')


function VariableExpression(symbol) {
    var name = symbol.name
    var type = Type.ILLEGAL

    this.getName = function() {
        return name
    }

    this.getType = function () {
        return type;
    }

    this.typeCheck = function(compilationContext) {
        var symbolTable = compilationContext.getSymbolTable()
        var symbol = null;

        if (symbolTable !== null) {
            symbol = symbolTable.get(name);
            if (symbol !== null) {
                type = symbol.type
            }
        }
        return type;
    }

    // To evaluate a variable, do a look in the SymbolTable of RUNTIME_CONTEXT
    this.evaluate = function(runtimeContext) {
        var symbolTable = runtimeContext.getSymbolTable();
        if (symbolTable === null) {
            return null;
        } else {
            return symbolTable.get(name);
        }
    }
}

function StringVariable(compilationContext, name, value) {
    var symbol = new Symbol(name, Type.STRING, value)
    var symbolTable = compilationContext.getSymbolTable()
    VariableExpression.call(this, symbol); //constructor chaining for inheritance
    symbolTable.add(symbol)
}

function BooleanVariable(compilationContext, name, value) {
    var symbol = new Symbol(name, Type.BOOLEAN, value)
    var symbolTable = compilationContext.getSymbolTable()
    VariableExpression.call(this, symbol); //constructor chaining for inheritance
    symbolTable.add(symbol)
}

function NumericVariable(compilationContext, name, value) {
    var symbol = new Symbol(name, Type.NUMERIC, value)
    var symbolTable = compilationContext.getSymbolTable()
    VariableExpression.call(this, symbol); //constructor chaining for inheritance
    symbolTable.add(symbol)
}

module.exports = VariableExpression