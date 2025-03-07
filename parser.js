/*
[
  {
    type: "INTEGER",
    value: 10,
  }, {
    type: "MULTIPLY",
    value: "*",
  }, {
    type: "INTEGER",
    value: 3,
  }, {
    type: "EOF",
    value: "EOF",
  }
]
*/

import { tokenTypes } from "./Lexer";

export default class Parser {
  #tokens = [];
  #cursor = 0;

  constructor(tokens) {
    this.#tokens = tokens;
  }

  #at() {
    return this.#tokens[this.#cursor];
  }

  // eat token just returns the token that it eats, if the type matches and increments cursor
  #eatToken(paramType) {
    if (this.#at().type == paramType) {
      return this.#tokens[this.#cursor++];
    } else {
      throw new Error("Invalid type!");
    }
  }

  parse() {
    return this.#parseAdditionSubtraction();
  }

  #parseAdditionSubtraction() {
    let left = this.#parseMultiplicationDivision();

    while (
      this.#at().type == tokenTypes.PLUS ||
      this.#at().type == tokenTypes.MINUS
    ) {
      let currentToken = this.#eatToken(this.#at().type);
      let operator = currentToken.value;
      // now that we have eaten the multiplication token, so the cursor should now be on 3
      // in 10 * 3, so we get the AST for 3 by passing it in the parseNumbers function
      let right = this.#parseMultiplicationDivision(); // parsing the 3rd token cuz first 2 were eaten
      left = {
        name: "BinaryExpression",
        value: operator,
        left: left,
        right: right,
      };
    }

    return left;
  }

  #parseMultiplicationDivision() {
    let left = this.#parseNumbers();

    while (
      this.#at().type == tokenTypes.MULTIPLY ||
      this.#at().type == tokenTypes.DIVIDE
    ) {
      let currentToken = this.#eatToken(this.#at().type);
      let operator = currentToken.value;
      // now that we have eaten the multiplication token, so the cursor should now be on 3
      // in 10 * 3, so we get the AST for 3 by passing it in the parseNumbers function
      let right = this.#parseNumbers(); // parsing the 3rd token cuz first 2 were eaten
      left = {
        name: "BinaryExpression",
        value: operator,
        left: left,
        right: right,
      };
    }

    return left;
  }

  #parseNumbers() {
    const numberToken = this.#eatToken(tokenTypes.INTEGER);
    return {
      name: "NumericLiteral",
      value: numberToken.value,
    };
  }
}
