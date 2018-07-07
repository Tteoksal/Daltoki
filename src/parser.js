module.exports = (() => {
  const {TOKEN_TYPE} = require('./lexer');
  const PARSER_STATUS = {
    NONE: Symbol('None'),
    NUMBER: Symbol('Number'),
    CONTAINER_HEAD: Symbol('ContainerHead'),
    CONTAINER_BODY: Symbol('ContainerBody'),
    CONTAINER_FUNC: Symbol('ContainerFunc'),
    ATTRIBUTE: Symbol('Attribute'),
    IDENTIFIER: Symbol('Identifier'),
    MEMBER_OPERATOR: Symbol('MemberOperator'),
    CONTAINER: Symbol('Container'),
    STRING: Symbol('String')
  };
  const STATUS_ELEMENT_TABLE = {
    NUMBER: [PARSER_STATUS.ATTRIBUTE, PARSER_STATUS.CONTAINER_BODY],
    STRING: [PARSER_STATUS.ATTRIBUTE, PARSER_STATUS.CONTAINER_BODY],
    IDENTIFIER: [PARSER_STATUS.CONTAINER_HEAD, PARSER_STATUS.CONTAINER_BODY, PARSER_STATUS.CONTAINER_FUNC, PARSER_STATUS.MEMBER_OPERATOR, PARSER_STATUS.ATTRIBUTE],
    CONTAINER: [PARSER_STATUS.NONE, PARSER_STATUS.CONTAINER_BODY, PARSER_STATUS.ATTRIBUTE],
    ATTRIBUTE: [PARSER_STATUS.CONTAINER_HEAD],
    MEMBER_OPERATOR: [PARSER_STATUS.IDENTIFIER],
    CODE_COVER: [PARSER_STATUS.ATTRIBUTE, PARSER_STATUS.CONTAINER_BODY]
  };
  const ELEMENT_KIND = {
    ATTRIBUTE: Symbol('Attribute'),
    IDENTIFIER: Symbol('Identifier'),
    MEMBER_OPERATOR: Symbol('MemberOperator'),
    CONTAINER: Symbol('Container'),
    NUMBER: Symbol('Number'),
    STRING: Symbol('String'),
    CODE_COVER: Symbol('CodeCover')
  };

  class ParsingError extends Error {
    constructor (msg,info = 'No Given Info') {
      super(`ParsingError: ${msg} \n ${String(info)}`);
    }
  }

  class Element {
    constructor(type, value) {
      this.type = type;
      this.value = value;
    }
  }
  class NumberElement extends Element {
    constructor(number) {
      super(ELEMENT_KIND.NUMBER, number);
    }
  }
  class StringElement extends Element {
    constructor(string) {
      super(ELEMENT_KIND.STRING, string);
    }
  }
  class ContainerElement extends Element {
    constructor(func, attributes, body) {
      super(ELEMENT_KIND.CONTAINER, {function: func, attributes, body});
    }
  }
  class IdentifierElement extends Element {
    constructor(identifier) {
      super(ELEMENT_KIND.IDENTIFIER, identifier);
    }
  }
  class MemberOperatorElement extends Element {
    constructor(base, identifier) {
      super(ELEMENT_KIND.MEMBER_OPERATOR, {base, identifier});
    }
  }
  class AttributeElement extends Element {
    constructor(key, value) {
      super(ELEMENT_KIND.ATTRIBUTE, {key, value})
    }
  }
  class CodeCoverElement extends Element {
    constructor(code) {
      super(ELEMENT_KIND.CODE_COVER, code);
    }
  }

  class Parser {
    constructor(tokenizer) {
      this.lexer = tokenizer;
      this.status = PARSER_STATUS.NONE;
    }

    extractParsetree() {
      const lexer = this.lexer.extractToken();

      if(this.status !== PARSER_STATUS.NONE)
        throw new ParsingError('Status of Parser is not NONE when begin.', this.status);

      return this.parseTokens(lexer);
    }

    parseTokens(lexer) {
      const item = lexer.next();
      const token = item.value;
      let result;

      if(item.done) return ;
      switch(token.type) {
        case TOKEN_TYPE.NUMBER:
          result = this.parseNumber(lexer, token);
          break;
        case TOKEN_TYPE.STRING:
          result = this.parseString(lexer, token);
          break;
        case TOKEN_TYPE.CODE_COVER:
          result = this.parseCoveredCode(lexer);
          break;
        case TOKEN_TYPE.IDENTIFIER:
          result = this.parseIdentifier(lexer, token);
          break;
        case TOKEN_TYPE.LEFT_CONT_COVER:
          result = this.parseContainer(lexer);
          break;
        case TOKEN_TYPE.RIGHT_CONT_COVER:
          break;
        default:
          throw new ParsingError('unexpected token', token);
      }

      return result;
    }

    parseNumber(lexer, numberToken) {
      if(this.checkStatus(STATUS_ELEMENT_TABLE.NUMBER)) {
        const finish = this.statusController(PARSER_STATUS.NUMBER);
        const result = new NumberElement(numberToken.string);
        finish();
        return result;
      }
    }

    parseString(lexer, StringToken) {
      if(this.checkStatus(STATUS_ELEMENT_TABLE.STRING)) {
        const finish = this.statusController(PARSER_STATUS.NUMBER);
        const result = new StringElement(StringToken.string);
        finish();
        return result;
      }
    }

    parseIdentifier(lexer, identifierToken) {
      if(this.checkStatus(STATUS_ELEMENT_TABLE.IDENTIFIER)) {
        const finish = this.statusController(PARSER_STATUS.IDENTIFIER);
        const nextToken = lexer.next('peek').value;
        let result = new IdentifierElement(identifierToken.string);
        if(nextToken.type === TOKEN_TYPE.MEMBER_OPERATOR) {
          lexer.next();
          result = this.parseMemberOperator(lexer, identifierToken);
        } else if(nextToken.type === TOKEN_TYPE.EQUAL_OPERATOR) {
          lexer.next();
          finish();
          result = this.parseAttribute(lexer, identifierToken);
        }
        finish();
        return result;
      }
    }

    parseMemberOperator(lexer, baseIdentifier) {
      if(this.checkStatus(STATUS_ELEMENT_TABLE.MEMBER_OPERATOR)) {
        const finish = this.statusController(PARSER_STATUS.MEMBER_OPERATOR);
        const base = new IdentifierElement(baseIdentifier.string);
        const result = new MemberOperatorElement(base, this.parseTokens(lexer));
        finish();
        return result;
      }
    }

    parseContainer(lexer) {
      if(this.checkStatus(STATUS_ELEMENT_TABLE.CONTAINER)) {
        const peekedToken = lexer.next('peek').value;
        let result;
        if(peekedToken.type === TOKEN_TYPE.IDENTIFIER) {
          const func = this.parseContainerFunc(lexer);
          const attributes = this.parseContainerHead(lexer);
          const body = this.parseContainerBody(lexer);
          result = new ContainerElement(func, attributes, body);
        } else {
          let tmp = peekedToken;
          while(tmp.type !== TOKEN_TYPE.RIGHT_CONT_COVER)
            tmp = lexer.next().value;
        }
        return result;
      }
    }

    parseContainerFunc(lexer) {
      const finish = this.statusController(PARSER_STATUS.CONTAINER_FUNC);
      const func = this.parseTokens(lexer);
      finish();
      return func;
    }

    parseContainerHead(lexer) {
      const finish = this.statusController(PARSER_STATUS.CONTAINER_HEAD);
      const attributes = [];
      let tmp;
      while(tmp = this.parseTokens(lexer)) {
        attributes.push(tmp);
      }
      finish();
      return attributes;
    }

    parseContainerBody(lexer) {
      const finish = this.statusController(PARSER_STATUS.CONTAINER_BODY);
      const bodyExpressions = [];
      let tmp;
      while(tmp = this.parseTokens(lexer)) {
        bodyExpressions.push(tmp);
      }
      finish();
      return bodyExpressions;
    }

    parseAttribute(lexer, attributeNameToken) {
      if(this.checkStatus(STATUS_ELEMENT_TABLE.ATTRIBUTE)) {
        const finish = this.statusController(PARSER_STATUS.ATTRIBUTE);
        const attributeName = attributeNameToken.string;
        const attributeValue = this.parseTokens(lexer);
        const result = new AttributeElement(attributeName, attributeValue);
        finish();
        return result;
      }
    }

    parseCoveredCode(lexer) {
      if(this.checkStatus(STATUS_ELEMENT_TABLE.CODE_COVER))
        return new CodeCoverElement(this.parseTokens(lexer));
    }

    statusController(newStatus) {
      const oldStatus = this.status;
      this.status = newStatus;
      return () => this.status = oldStatus;
    }

    checkStatus(acceptableStatus) {
      const accept = acceptableStatus.some(expectedStatus => this.status === expectedStatus);
      if(!accept)
        throw new ParsingError('unexpected status of Parser', this.status);
      return true;
    }
  }

  return Parser;
})();