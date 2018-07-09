const TOKEN_TYPE = require('./token-types');
const TokenizingError = require('./tokenizing-error');
const Token = require('./token');

class Tokenizer {
  constructor(string) {
    this.str = string;
  }

  [Symbol.iterator]() {
    const string = this.str;
    function* iterator() {
      let ptr = 0;
      let type = yield;
      while (ptr < string.length) {
        const char = string[ptr++];
        if (type === "peek") ptr--;
        type = yield char;
      }
    }
    const resultIterator = iterator();
    resultIterator.next();
    return resultIterator;
  }

  *composeToken() {
    const iterator = this[Symbol.iterator]();
    let tmp;
    while (!(tmp = iterator.next()).done) {
      let token = tmp.value;
      let type = Tokenizer.inferenceTokenType(token);
      if (type === TOKEN_TYPE.BLANK) continue;
      else if (type === TOKEN_TYPE.DIGIT) {
        while (
          !(tmp = iterator.next("peek")).done &&
          Tokenizer.isDigit(tmp.value)
          ) {
          token += tmp.value;
          iterator.next();
        }
        type = TOKEN_TYPE.NUMBER;
      } else if (type === TOKEN_TYPE.IDENTIFIER_CHAR) {
        while (
          !(tmp = iterator.next("peek")).done &&
          Tokenizer.isIdentifierPart(tmp.value)
          ) {
          token += tmp.value;
          iterator.next();
        }
        type = TOKEN_TYPE.IDENTIFIER;
      } else if (type === TOKEN_TYPE.STRING_BOARDER) {
        token = "";
        while (
          !(tmp = iterator.next()).done &&
          !Tokenizer.isStringBoarder(tmp.value)
          ) {
          token += tmp.value;
        }
        type = TOKEN_TYPE.STRING;
      }
      if (type === TOKEN_TYPE.ANY_CHARACTER)
        throw new TokenizingError(
          "Detected Non-used ANY_CHARACTER Token",
          token
        );
      else yield new Token(type, token);
    }
  }

  extractToken() {
    const tokenGenerator = this.composeToken();
    function* getToken() {
      const tokens = [...tokenGenerator];
      let readType = yield;
      let ptr = 0;
      while (ptr < tokens.length) {
        const result = tokens[ptr++];
        if (readType === "peek") ptr--;
        readType = yield result;
      }
    }
    const tokenIterator = getToken();
    tokenIterator.next();
    return tokenIterator;
  }

  static inferenceTokenType(char) {
    let type;
    switch (true) {
      case Tokenizer.isBlank(char):
        type = TOKEN_TYPE.BLANK;
        break;
      case Tokenizer.isDigit(char):
        type = TOKEN_TYPE.DIGIT;
        break;
      case Tokenizer.isOperator(char):
        if (char === ".") type = TOKEN_TYPE.MEMBER_OPERATOR;
        else type = TOKEN_TYPE.EQUAL_OPERATOR;
        break;
      case Tokenizer.isCodeCover(char):
        type = TOKEN_TYPE.CODE_COVER;
        break;
      case Tokenizer.isContCover(char):
        if (char === "<") type = TOKEN_TYPE.LEFT_CONT_COVER;
        else type = TOKEN_TYPE.RIGHT_CONT_COVER;
        break;
      case Tokenizer.isIdentifierPart(char):
        type = TOKEN_TYPE.IDENTIFIER_CHAR;
        break;
      case Tokenizer.isCloseMarker(char):
        type = TOKEN_TYPE.CLOSE_CONT_MARKER;
        break;
      case Tokenizer.isStringBoarder(char):
        type = TOKEN_TYPE.STRING_BOARDER;
        break;
      default:
        type = TOKEN_TYPE.ANY_CHARACTER;
    }
    return type;
  }

  static isBlank(char) {
    const checker = /\s/;
    return checker.test(char);
  }

  static isDigit(char) {
    const checker = /\d/;
    return checker.test(char);
  }

  static isContCover(char) {
    const checker = /[<>]/;
    return checker.test(char);
  }

  static isIdentifierPart(char) {
    const checker = /\w/;
    return checker.test(char);
  }

  static isOperator(char) {
    const checker = /[=.]/;
    return checker.test(char);
  }

  static isCodeCover(char) {
    const checker = /`/;
    return checker.test(char);
  }

  static isCloseMarker(char) {
    const checker = /\//;
    return checker.test(char);
  }

  static isStringBoarder(char) {
    const checker = /"/;
    return checker.test(char);
  }
}

module.exports = Tokenizer;