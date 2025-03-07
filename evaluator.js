export default function Evaluate(ast) {
  if (ast.name == "NumericLiteral") {
    return ast.value;
  }

  let left = Evaluate(ast.left);
  let right = Evaluate(ast.right);
  let result;

  switch (ast.value) {
    case "+":
      result = left + right;
      break;
    case "-":
      result = left - right;
      break;
    case "*":
      result = left * right;
      break;
    case "/":
      result = left / right;
      break;
  }

  return result;
}
