export const tokenTypes = {
  PLUS: "PLUS",
  MINUS: "MINUS",
  MULTIPLY: "MULTIPLY",
  DIVIDE: "DIVIDE",
  INTEGER: "INTEGER",
  LEFT_BRACKET: "LEFT_BRACKET",
  RIGHT_BRACKET: "RIGHT_BRACKET",
  EOF: "EOF",
};

export default class Lexer {
  #stream = "";
  #cursor = 0;
  #at() {
    return this.#stream[this.#cursor];
  }

  tokenize(input = "") {
    this.#stream = input;
    this.#cursor = 0;

    const tokens = [];

    // iterate over the characters
    while (this.#cursor < this.#stream.length) {
      switch (this.#at()) {
        case " ":
        case "\t":
        case "\n":
          break;

        case "+":
          tokens.push({ type: tokenTypes.PLUS, value: "+" });
          break;
        case "-":
          tokens.push({ type: tokenTypes.MINUS, value: "-" });
          break;
        case "*":
          tokens.push({ type: tokenTypes.MULTIPLY, value: "*" });
          break;
        case "/":
          tokens.push({ type: tokenTypes.DIVIDE, value: "/" });
          break;
        case "(":
          tokens.push({ type: tokenTypes.LEFT_BRACKET, value: "(" });
          break;
        case ")":
          tokens.push({ type: tokenTypes.RIGHT_BRACKET, value: ")" });
          break;
        default:
          if (isNumeric(this.#at())) {
            let strNumber = "";

            while (
              this.#cursor < this.#stream.length &&
              isNumeric(this.#at())
            ) {
              strNumber += this.#at();
              this.#cursor++;
            }

            tokens.push({
              type: tokenTypes.INTEGER,
              value: parseInt(strNumber),
            });
            this.#cursor--;
          } else {
            throw new Error(
              `Invalid character at position ${this.#cursor}, received: ${this.#at()}`,
            );
          }

          break;
      }

      this.#cursor++;
    }

    tokens.push({ type: tokenTypes.EOF, value: "EOF" });
    return tokens;
    /*


    */
  }
}

function isNumeric(char = "") {
  return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
}
