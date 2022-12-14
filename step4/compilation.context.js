const SymbolTable = require('./symbol.table')

// A Context is necessary for Variable scope
function CompilationContext() {
    var symbolTable = new SymbolTable()
    
    this.getSymbolTable = function() {
        return symbolTable
    }

    this.setSymbolTable = function(table) {
        symbolTable = table
    }
}

module.exports = CompilationContext