const RDParser = require('./rd.parser')
const CompilationContext = require('./compilation.context')
const RuntimeContext = require('./runtime.context')
const ExpressionBuilder = require('./expression.builder')

function testStatements() {
  let str1 = "PRINTLINE 2*10;" + "\n" + "PRINTLINE 10;\n PRINT 2*10;\n";
  let str2 = "NUMERIC a; a=10; PRINTLINE a;"
  let str3 = "BOOLEAN b; b = FALSE; b=TRUE; PRINT b;"
  let str4 = "STRING s; s=\"HELLO WORLD\"; PRINTLINE s;";
  let str5 = "PRINT -2;";//Unary Expression
  let str6 = "PRINT a*6;";

  let code = str1+str2+str3+str4+str5+str6

  var compilationContext = new CompilationContext()
  // let expression = new ExpressionBuilder("2*2").getExpression(compilationContext)
  // expression.evaluate(compilationContext)
  let parser = new RDParser(code)
  let statements = parser.parse(compilationContext)

  console.log("....................................................")
  console.log("....................................................")
  console.log("....................................................")
  
  console.log(compilationContext.getSymbolTable().getAll())

  console.log("....................................................")
  console.log("Compilation Success!")
  console.log("....................................................")

  var runtimeContext = new RuntimeContext();
  for(let stmt in statements) {
    statements[stmt].execute(runtimeContext)
  }
  console.log(runtimeContext.getSymbolTable().getAll())
}

testStatements()