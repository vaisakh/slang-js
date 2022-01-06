const OPERATOR = require('./operator')
const UnaryExpression = require('./unary.expression')
const BinaryExpression = require('./binary.expression')
const NumericConstantExpression = require('./numeric.constant.expression')

// Abstract Syntax Tree (AST) for 5*10
let exp1 = new BinaryExpression(new NumericConstantExpression(5),
new NumericConstantExpression(10), OPERATOR.MUL)

console.log(exp1.evaluate(null))


// AST for -(10 + (30 + 50 ) )
exp2 = new UnaryExpression(
  new BinaryExpression(new NumericConstantExpression(10),
  new BinaryExpression(new NumericConstantExpression(30), new NumericConstantExpression(50),
  OPERATOR.PLUS), OPERATOR.PLUS),
  OPERATOR.MINUS);
  
console.log(exp2.evaluate(null))