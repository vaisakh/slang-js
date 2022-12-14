const NumericConstantExpression = require('./numeric.constant.expression')
const BinaryExpression = require('./binary.expression')
const UnaryExpression = require('./unary.expression')
const SlangException = require('./slang.exception')
const Lexer = require("./lexer")
const OPERATOR = require("./operator")
const TOKEN = require("./token")
const PrintStatement = require('./print.statement');
const PrintLineStatement = require('./printline.statement');
const Symbol = require('./symbol')
const TYPE = require("./type")
const VariableDeclarationStatement = require('./variable.declaration.statement')
const AssignmentStatement = require('./assignment.statement')
const StringLiteralExpression = require('./string.literal.expression')
const BooleanConstantExpression = require('./boolean.constant.expression')
const VariableExpression = require('./variable.expression')

function RDParser(str) {
  Lexer.call(this, str) // Constructor chaining for inherticance
  this.currentToken = TOKEN.ILLEGAL_TOKEN

  this.parse = function(compilationContext) {
    this.currentToken = this.getToken()
    return this.statementList(compilationContext)
  }

  // <stmtlist> := { <statement> }+
  this.statementList = function(compilationContext) {
    let statements = []
    while(this.currentToken !== TOKEN.TOK_NULL) {
      let statement = this.parseStatement(compilationContext)
      if(statement != null)
        statements.push(statement)
    }
    return statements
  }

  // <statement> := <printstmt> | <printlinestmt>
  this.parseStatement = function(compilationContext) {
    let statement = null
    switch(this.currentToken) {
      case TOKEN.TOK_PRINT:
        statement = this.parsePrintStatement(compilationContext)
        this.currentToken = this.getToken()
        break
      case TOKEN.TOK_PRINTLN:
        statement = this.parsePrintLineStatement(compilationContext)
        this.currentToken = this.getToken()
        break
      case TOKEN.TOK_VAR_STRING:
      case TOKEN.TOK_VAR_NUMBER:
      case TOKEN.TOK_VAR_BOOL:
        statement = this.parseVariableDeclarationStatement(compilationContext);
        this.currentToken = this.getToken()
        break
      case TOKEN.TOK_UNQUOTED_STRING:
        statement = this.parseAssignmentStatement(compilationContext)
        this.currentToken = this.getToken()
        break
      default:
        throw new SlangException('Invalid statement!')
    }
    return statement
  }

  this.parseAssignmentStatement = function(compilationContext) {
    var variable = this.getLastString()
    var symbol = compilationContext.getSymbolTable().get(variable) || null
    
    if(symbol == null) {
      throw new SlangException("Compilation Error : ", variable, " Variable not found.")
    }

    this.currentToken = this.getToken()
    if (this.currentToken !== TOKEN.TOK_ASSIGN) {
        throw new SlangException("Compilation Error : = Expected!")
    }

    this.currentToken = this.getToken()
    expr = this.parseExpression(compilationContext)
    
    if (expr.typeCheck(compilationContext) !== symbol.type) {
      throw new SlangException("Compilation Error : Type mismatch in Assigment.");
    }

    if (this.currentToken !== TOKEN.TOK_SEMI) {
      throw new SlangException("Compilation Error :  ; Expected.");
    }

    statement = new AssignmentStatement(expr);
    statement.setSymbol(symbol);
    return statement;
  }

  // <vardeclstmt> := STRING <varname>; | NUMERIC <varname>; | BOOLEAN <varname>;
  this.parseVariableDeclarationStatement = function(compilationContext) {
    // Data Type
    var token = this.currentToken

    // TOK_UNQUOTED_STRING
    this.currentToken = this.getToken()

    if(this.currentToken == TOKEN.TOK_UNQUOTED_STRING) {
      var symbol = new Symbol()
      symbol.name = this.getLastString()
      symbol.type = (token == TOKEN.TOK_VAR_BOOL) ? TYPE.BOOLEAN : (token == TOKEN.TOK_VAR_NUMBER) ? TYPE.NUMERIC : TYPE.STRING

      this.currentToken = this.getToken()
      if(this.currentToken === TOKEN.TOK_SEMI) {
        compilationContext.getSymbolTable().add(symbol)
        return new VariableDeclarationStatement(symbol)
      } else {
        throw new SlangException("Compilation Error: ; expected!");
      }
    } else {
      throw new SlangException("Compilation Error: Invalid variable declaration!");
    }
  }

  // <printstmt> := print <expr>;
  this.parsePrintStatement = function(compilationContext) {
    this.currentToken = this.getToken()
    expression = this.parseExpression(compilationContext)
    expression.typeCheck(compilationContext)
    if(this.currentToken != TOKEN.TOK_SEMI)
      throw new SlangException('Compilation Error: ; expected')

    return new PrintStatement(expression)
  }

  // <printlinestmt>:= printline <expr>;
  this.parsePrintLineStatement = function(compilationContext) {
    this.currentToken = this.getToken()
    expression = this.parseExpression(compilationContext)
    if(this.currentToken != TOKEN.TOK_SEMI)
      throw new SlangException(': expected')
    
    return new PrintLineStatement(expression)
  }

  this.callExpression = function(compilationContext) {
    this.currentToken = this.getToken();
    return this.parseExpression(compilationContext)
  }

  // <Expr> ::= <Term> | <Term> { + | - } <Expr></Expr>
  this.parseExpression = function(compilationContext) {
    let expression = this.parseTerm(compilationContext)
    while(this.currentToken == TOKEN.TOK_PLUS || this.currentToken == TOKEN.TOK_MINUS) {
      let operatorToken = this.currentToken
      this.currentToken = this.getToken()
      let expression1 = this.parseExpression(compilationContext)
      operatorToken = operatorToken == TOKEN.TOK_PLUS ? OPERATOR.PLUS : OPERATOR.MINUS
      expression = new BinaryExpression(expression, expression1, operatorToken)
    }
    return expression
  }

  // <Term> ::= <Factor> | <Factor> {*|/} <Term>
  this.parseTerm = function(compilationContext) {
    let expression = this.parseFactor(compilationContext)
    while(this.currentToken == TOKEN.TOK_MULTIPLY || this.currentToken == TOKEN.TOK_DIVISION) {
      let operatorToken = this.currentToken
      this.currentToken = this.getToken()

      expression1 = this.parseTerm(compilationContext)
      operatorToken = operatorToken == TOKEN.TOK_MULTIPLY ? OPERATOR.MUL : OPERATOR.DIV
      expression = new BinaryExpression(expression, expression1, operatorToken)
    }
    return expression
  }

  // <Factor>::= <number> | ( <expr> ) | {+|-} <factor></factor>
  this.parseFactor = function(compilationContext) {
    let expression = null
    if(this.currentToken == TOKEN.TOK_DOUBLE) {
      expression = new NumericConstantExpression(this.getNumber())
      this.currentToken = this.getToken()
    } else if(this.currentToken == TOKEN.TOK_STRING) {
      expression = new StringLiteralExpression(this.getLastString())
      this.currentToken = this.getToken()
    } else if(this.currentToken == TOKEN.TOK_BOOL_TRUE || this.currentToken == TOKEN.TOK_BOOL_FALSE) {
        expression = new BooleanConstantExpression(this.currentToken === TOKEN.TOK_BOOL_TRUE ? true : false);
        this.currentToken = this.getToken();
    } else if(this.currentToken == TOKEN.TOK_OPEN_PAREN) {
      this.currentToken = this.getToken()
      expression = this.parseExpression(compilationContext)

      if(this.currentToken != TOKEN.TOK_CLOSED_PAREN)
        throw new SlangException('Missing closing parenthesis!')

      this.currentToken = this.getToken()
    } else if(this.currentToken == TOKEN.TOK_PLUS || this.currentToken == TOKEN.TOK_MINUS) {
      operatorToken = this.currentToken
      this.currentToken = this.getToken()

      expression = this.parseFactor(compilationContext)
      operatorToken = operatorToken == TOKEN.TOK_PLUS ? OPERATOR.PLUS : OPERATOR.MINUS
      expression = new UnaryExpression(expression, operatorToken)
    } else if(this.currentToken == TOKEN.TOK_UNQUOTED_STRING) {
      // Variable
      symbol = compilationContext.getSymbolTable().get(this.getLastString()) || null
      if (symbol === null) {
          throw new SlangException(this.getLastString() + ' - Undefined Symbol!');
      } else {
          this.currentToken = this.getToken()
          expression = new VariableExpression(symbol);
      }
    } else {
      throw new SlangException('Illegal Token!');
    }
    return expression
  }
}

module.exports = RDParser