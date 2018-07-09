const Variable = require('../../evaluator/variable');
const NumberType = require('../../evaluator/types/number');
const ELEMENT_KIND = require('./element-kind');
const Element = require('./element');
const BigInt = require("big-integer");

class NumberElement extends Element {
  constructor(number) {
    super(ELEMENT_KIND.NUMBER, number);
  }

  eval() {
    const numValue = new BigInt(this.value);
    const numType = new NumberType();
    return new Variable(numType, numValue)
  }
}

module.exports = NumberElement;