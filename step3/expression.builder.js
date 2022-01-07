const RDParser = require("./rd.parser")

function ExpressionBuilder(expressionString) {
  this.getExpression = function() {
    let parser = new RDParser(expressionString)
    return parser.callExpression()
  }
}

module.exports = ExpressionBuilder