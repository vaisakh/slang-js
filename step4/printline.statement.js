function PrintLineStatement(expression) {
  this.execute = function(runtimeContext) {
    let symbol = expression.evaluate(runtimeContext)
    console.log('PRINTLINE: ', symbol)
    return true
  }
}

module.exports = PrintLineStatement