const ExpressionBuilder = require("./expression.builder");

let builder = new ExpressionBuilder("-2*(3+3)")
let expression = builder.getExpression()
console.log(expression.evaluate())