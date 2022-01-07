function PrintLineStatement(expression) {
  this.execute = function(runtimeContext) {
    let value = expression.evaluate()
    console.log(value.toString())
    return true
  }
}

module.exports = PrintLineStatement