const RDParser = require('./rd.parser')

function testStatements() {
  let str = "PRINTLINE 2*10;" + "\n" + "PRINTLINE 10;\n PRINT 2*10;\n";
  let parser = new RDParser(str)
  let statements = parser.parse()

  for(let stmt in statements) {
    statements[stmt].execute()
  }
}

testStatements()