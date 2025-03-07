import Lexer from "./Lexer";
import Parser from "./parser";

const lexer = new Lexer();

const maths = "10 * 3 - 1 + 69";
const tokens = lexer.tokenize(maths);

const parser = new Parser(tokens);
const ast = parser.parse()

console.log(ast)