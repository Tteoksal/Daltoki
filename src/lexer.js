module.exports = (() => {
  const TOKEN_TYPE = {
    BLANK: Symbol('Blank'),
    DIGITS: Symbol('Digits'),
    LEFT_CONT_COVER: Symbol('LeftContainerCover'),
    RIGHT_CONT_COVER: Symbol('RightContainerCover'),
    CLOSE_CONT_MARKER: Symbol('CloseContainerMarker'),
    IDENTIFIER_CHAR: Symbol('IdentifierChar'),
    IDENTIFIER: Symbol('Identifier'),
    NUMBER: Symbol('Number'),
    EQUAL_OPERATOR: Symbol('EqualOperator'),
    MEMBER_OPERATOR: Symbol('MemberOperator'),
    CODE_COVER: Symbol('CodeCover'),
    ANY_CHARACTER: Symbol('AnyCharacter')
  };

  class TokenizingError extends Error {
    constructor (msg,info = 'No Given Info') {
      super(`TokenizingError: ${msg} \n ${String(info)}`);
    }
  }

  class Tokenizer {
    constructor(string) {
      this.str = string;
    }

    [Symbol.iterator]() {
      const string = this.str;
      function* iterator() {
        let ptr = 0;
        let type = yield;
        while(ptr < string.length) {
          const char = string[ptr++];
          if(type === 'peek')
            ptr--;
          type = yield char;
        }
      }
      const resultIterator = iterator();
      resultIterator.next();
      return resultIterator;
    }

    * extractToken() {
      const iterator = this[Symbol.iterator]();
      let tmp;
      while(!(tmp = iterator.next()).done) {
        let token = tmp.value;
        let type = Tokenizer.inferenceTokenType(token);
        if(type === TOKEN_TYPE.BLANK) continue;
        else if(type === TOKEN_TYPE.DIGITS) {
          while(!(tmp = iterator.next('peek')).done && Tokenizer.isDigits(tmp.value)) {
            token += tmp.value;
            iterator.next();
          }
          type = TOKEN_TYPE.NUMBER;
        } else if(type === TOKEN_TYPE.IDENTIFIER_CHAR) {
            while(!(tmp = iterator.next('peek')).done && Tokenizer.isIdentifierPart(tmp.value)) {
              token += tmp.value;
              iterator.next();
            }
          type = TOKEN_TYPE.IDENTIFIER;
        }

        if(type === TOKEN_TYPE.ANY_CHARACTER)
          throw new TokenizingError('Detected Non-used ANY_CHARACTER Token', token);
        else
          yield new Token(type, token);
      }
    }

    static inferenceTokenType(char) {
      let type;
      switch (true) {
        case Tokenizer.isBlank(char):
          type = TOKEN_TYPE.BLANK;
          break;
        case Tokenizer.isDigits(char):
          type = TOKEN_TYPE.DIGITS;
          break;
        case Tokenizer.isOperator(char):
          if(char === '.')
            type = TOKEN_TYPE.MEMBER_OPERATOR;
          else
            type = TOKEN_TYPE.EQUAL_OPERATOR;
          break;
        case Tokenizer.isCodeCover(char):
          type = TOKEN_TYPE.CODE_COVER;
          break;
        case Tokenizer.isContCover(char):
          if(char === '<')
            type = TOKEN_TYPE.LEFT_CONT_COVER;
          else
            type = TOKEN_TYPE.RIGHT_CONT_COVER;
          break;
        case Tokenizer.isIdentifierPart(char):
          type = TOKEN_TYPE.IDENTIFIER_CHAR;
          break;
        case Tokenizer.isCloseMarker(char):
          type = TOKEN_TYPE.CLOSE_CONT_MARKER;
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

    static isDigits(char) {
      const checker = /\d/;
      return checker.test(char);
    }

    static isContCover(char) {
      const checker = /[<>]/;
      return checker.test(char);
    }

    static isIdentifierPart(char) {
      const checker = /\w$/;
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
  }

  class Token {
    constructor(type, string) {
      this.type = type;
      this.string = string;
    }
  }

  return {Tokenizer, TOKEN_TYPE};
})();