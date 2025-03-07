import Lexer from "./Lexer"

const lexer = new Lexer()

const maths = "10 * (30-20)";
const tokens = lexer.tokenize(maths)
console.table(tokens)
