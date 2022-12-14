const TOKEN = require('./token')
const SlangException = require('./slang.exception')

function Lexer(expression) {
  let index = 0
  let number = null
  let length = expression.length
  let token = TOKEN.ILLEGAL_TOKEN
  let lastString = null
  lastToken = null

  this.getToken = function() {
    let str = ''
    // Skip white space and new line characters
    while(index < length && expression.charAt(index) === ' ' || expression.charAt(index) === '\t' || 
      expression.charAt(index) === "\n" || expression.charAt(index) === "\r\n") {
      index++
    }

    // Returns a null token if end of the string
    if(index == length)
      return TOKEN.TOK_NULL

    switch(expression.charAt(index)) {
      case '+':
        token = TOKEN.TOK_PLUS
        index++
        break
      case '-':
        token = TOKEN.TOK_MINUS
        index++
        break
      case '*':
        token = TOKEN.TOK_MULTIPLY
        index++
        break
      case '/':
        token = TOKEN.TOK_DIVISION
        index++
        break
      case '(':
        token = TOKEN.TOK_OPEN_PAREN
        index++
        break
      case ')':
        token = TOKEN.TOK_CLOSED_PAREN
        index++
        break
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        while(index < length &&
          expression.charAt(index) === '0' ||
          expression.charAt(index) === '1' ||
          expression.charAt(index) === '2' ||
          expression.charAt(index) === '3' ||
          expression.charAt(index) === '4' ||
          expression.charAt(index) === '5' ||
          expression.charAt(index) === '6' ||
          expression.charAt(index) === '7' ||
          expression.charAt(index) === '8' ||
          expression.charAt(index) === '9') {
            str += expression.charAt(index)
            index++
          }
        number = parseFloat(str, 10)
        token = TOKEN.TOK_DOUBLE
        break
      case ';':
        token = TOKEN.TOK_SEMI
        index++
        break
      case '=':
        token = TOKEN.TOK_ASSIGN
        index++
        break
      case '"':
        index++
        tempString = ""
        while(index < length && expression.charAt(index) !== '"') {
          tempString += expression.charAt(index)
          index++
        }
        index++
        lastString = tempString
        token = TOKEN.TOK_STRING
        break
      default:
        if (expression.charAt(index).match(/[a-zA-Z]/g) !== null) {
          while (index < length && expression.charAt(index).match(/[a-zA-Z0-9_]/g) !== null) {
            str += expression.charAt(index)
            index++
          }

          lastString = str

          switch (str) {
            case 'PRINT':
              token = TOKEN.TOK_PRINT;
              break
            case 'PRINTLINE':
              token = TOKEN.TOK_PRINTLN;
              break
            case 'BOOLEAN':
              token = TOKEN.TOK_VAR_BOOL;
              break;
          case 'NUMERIC':
            token = TOKEN.TOK_VAR_NUMBER;
              break;
          case 'STRING':
            token = TOKEN.TOK_VAR_STRING;
              break;
          case 'TRUE':
            token = TOKEN.TOK_BOOL_TRUE;
            break;
        case 'FALSE':
            token = TOKEN.TOK_BOOL_FALSE;
            break;
          default:
            token = TOKEN.TOK_UNQUOTED_STRING;
          }
        } else {
            throw new SlangException('Invalid token!');
        }
    }
    return token
  }

  this.getNumber = function() {
    return number
  }

  this.getLastString = function () {
    return lastString
  }
}

module.exports = Lexer