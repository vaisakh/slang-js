function PrintStatement(expression) {
  this.execute = function(runtimeContext) {
    let symbol = expression.evaluate(runtimeContext)
    console.log('PRINT:', symbol)
    return true
  }
}

module.exports = PrintStatement