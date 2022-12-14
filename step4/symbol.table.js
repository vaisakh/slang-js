function SymbolTable() {
    var symbolTable = {};

    this.add = function (symbol) {
        symbolTable[symbol.name] = symbol;
        return true;
    }

    this.assignToTable = function (variable, symbol) {
        var varName = variable.getName();
        symbol.name = varName;
        symbolTable[varName] = symbol;
    }

    this.assignToVariable = function (varName, symbol) {
        symbolTable[varName] = symbol;
    }

    this.get = function (name) {
        return symbolTable[name];
    }

    this.getAll = function () {
        return symbolTable;
    }
}

module.exports = SymbolTable