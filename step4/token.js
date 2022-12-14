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
    TOK_DOUBLE: 'TOK_DOUBLE',
    TOK_PRINT: 'TOK_PRINT', //  Print statement
    TOK_PRINTLN: 'TOK_PRINTLN', // PrintLine statement
    TOK_UNQUOTED_STRING: 'TOK_UNQUOTED_STRING', // Variable name, function name
	  TOK_SEMI: 'TOK_SEMI', // ';'
    TOK_VAR_NUMBER: "NUMERIC", // NUMBER Data Type
    TOK_VAR_STRING: "STRING", // STRING Data Type
    TOK_VAR_BOOL: "BOOLEAN", // BOOLEAN Data Type
    TOK_BOOL_TRUE: "TRUE", // BOOLEAN TRUE
    TOK_BOOL_FALSE: "FALSE", // BOOLEAN FALSE
    TOK_NUMERIC: "NUMBER", // [0-9]+
    TOK_ASSIGN: "=", // Assignment Symbol =
    TOK_STRING: "CHARS", // String Literal
  }
})()

module.exports = TOKEN