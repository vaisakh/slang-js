const RDParser = require("./rd.parser")

function ExpressionBuilder(code) {
  this.getExpression = function(compilationContext) {
    let parser = new RDParser(code)
    return parser.callExpression(compilationContext)
  }
}

module.exports = ExpressionBuilder