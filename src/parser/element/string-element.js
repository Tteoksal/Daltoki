const Variable = require('../../evaluator/variable');
const StringType = require('../../evaluator/types/string');
const ELEMENT_KIND = require('./element-kind');
const Element = require('./element');

class StringElement extends Element {
  constructor(string) {
    super(ELEMENT_KIND.STRING, string);
  }

  eval() {
    const stringValue = this.value;
    const stringType = new StringType();
    return new Variable(stringType, stringValue);
  }
}

module.exports = StringElement;