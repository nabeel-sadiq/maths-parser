import Lexer from "./Lexer";
import Parser from "./parser";
import Evaluate from "./evaluator";

const lexer = new Lexer();

const maths = "10 * 3 + 3-69";
const tokens = lexer.tokenize(maths);

const parser = new Parser(tokens);
const ast = parser.parse();

let answer = Evaluate(ast);
console.table(tokens);
console.log(ast);
console.log(`Answer:`, answer);
