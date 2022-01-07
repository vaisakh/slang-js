const TOKEN = require('./token')
const SlangException = require('./slang.exception')

function Lexer(expression) {
  let index = 0
  let number = null
  let length = expression.length
  let token = TOKEN.ILLEGAL_TOKEN

  this.getToken = function() {
    // Skip white space
    while(index < length && expression[index] == '' && expression[index] == '\t')
      index++

    // End of string? return null
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
        let str = ''
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
      default:
        throw new SlangException('Invalid token!')
    }
    return token
  }

  this.getNumber = function() {
    return number
  }
}

module.exports = Lexer