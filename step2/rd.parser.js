const NumericConstantExpression = require('./numeric.constant.expression')
const BinaryExpression = require('./binary.expression')
const UnaryExpression = require('./unary.expression')
const SlangException = require('./slang.exception')
const Lexer = require("./lexer");
const OPERATOR = require("./operator");
const TOKEN = require("./token");

function RDParser(str) {
  Lexer.call(this, str) // Constructor chaining for inherticance
  this.currentToken = TOKEN.ILLEGAL_TOKEN;
  this.callExpression = function() {
    this.currentToken = this.getToken();
    return this.parseExpression()
  }

  // <Expr> ::= <Term> | <Term> { + | - } <Expr></Expr>
  this.parseExpression = function() {
    let expression = this.parseTerm()
    while(this.currentToken == TOKEN.TOK_PLUS || this.currentToken == TOKEN.TOK_MINUS) {
      let operatorToken = this.currentToken
      this.currentToken = this.getToken()
      let expression1 = this.parseExpression()
      operatorToken = operatorToken == TOKEN.TOK_PLUS ? OPERATOR.PLUS : OPERATOR.MINUS
      expression = new BinaryExpression(expression, expression1, operatorToken)
    }
    return expression
  }

  // <Term> ::= <Factor> | <Factor> {*|/} <Term>
  this.parseTerm = function() {
    let expression = this.parseFactor()
    while(this.currentToken == TOKEN.TOK_MULTIPLY || this.currentToken == TOKEN.TOK_DIVISION) {
      let operatorToken = this.currentToken
      this.currentToken = this.getToken()

      expression1 = this.parseTerm()
      operatorToken = operatorToken == TOKEN.TOK_MULTIPLY ? OPERATOR.MUL : OPERATOR.DIV
      expression = new BinaryExpression(expression, expression1, operatorToken)
    }
    return expression
  }

  // <Factor>::= <number> | ( <expr> ) | {+|-} <factor></factor>
  this.parseFactor = function() {
    let expression = null
    if(this.currentToken == TOKEN.TOK_DOUBLE) {
      expression = new NumericConstantExpression(this.getNumber())
      this.currentToken = this.getToken()
    } else if(this.currentToken == TOKEN.TOK_OPEN_PAREN) {
      this.currentToken = this.getToken()
      expression = this.parseExpression()

      if(this.currentToken != TOKEN.TOK_CLOSED_PAREN)
        throw new SlangException('Missing closing parenthesis!')

      this.currentToken = this.getToken()
    } else if(this.currentToken = TOKEN.TOK_PLUS || this.currentToken == TOKEN.TOK_MINUS) {
      operatorToken = this.currentToken
      this.currentToken = this.getToken()

      expression = this.parseFactor()
      operatorToken = operatorToken == TOKEN.TOK_PLUS ? OPERATOR.PLUS : OPERATOR.MINUS
      expression = new UnaryExpression(expression, operatorToken)
    } else {
      throw new SlangException('Illegal Token!');
    }
    return expression
  }
}

module.exports = RDParser