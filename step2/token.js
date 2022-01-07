let TOKEN = (function() {
  return {
    ILLEGAL_TOKEN: 'ILLEGAL_TOKEN', // Not a token
    TOK_PLUS: 'TOK_PLUS', // '+'
    TOK_MINUS: 'TOK_MINUS', // '-'
    TOK_MULTIPLY: 'TOK_MULTIPLY', // '*'
    TOK_DIVISION: 'TOK_DIVISION', // '/'
    TOK_OPEN_PAREN: 'TOK_OPEN_PAREN', // '('
    TOK_CLOSED_PAREN: 'TOK_CLOSED_PAREN', // ')
    TOK_NULL: 'TOK_NULL', // End of a string,
    TOK_DOUBLE: 'TOK_DOUBLE'
  }
})()

module.exports = TOKEN