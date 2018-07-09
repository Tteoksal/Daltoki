const Type = require('./type');
const TYPES = require('./types');
const BigInt = require("big-integer");

class NumberType extends Type {
  constructor() {
    super(TYPES.NUMBER);
  }

  static add(x, y) {
    const isNumber = super.isType(TYPES.NUMBER, x);
    const isSame = super.isSameType(x, y);
    if(!isSame || !isNumber)
      throw new TypeError('find non-number variable');
    const xVal = x.unwrap();
    const yVal = y.unwrap();
    return xVal.add(yVal);
  }

  static sub(x, y) {
    const isNumber = super.isType(TYPES.NUMBER, x);
    const isSame = super.isSameType(x, y);
    if(!isSame || !isNumber)
      throw new TypeError('find non-number variable');
    const xVal = x.unwrap();
    const yVal = y.unwrap();
    return xVal.sub(yVal);
  }

  static mul(x, y) {
    const isNumber = super.isType(TYPES.NUMBER, x);
    const isSame = super.isSameType(x, y);
    if(!isSame || !isNumber)
      throw new TypeError('find non-number variable');
    const xVal = x.unwrap();
    const yVal = y.unwrap();
    return xVal.multiply(yVal);
  }

  static div(x, y) {
    const isNumber = super.isType(TYPES.NUMBER, x);
    const isSame = super.isSameType(x, y);
    if(!isSame || !isNumber)
      throw new TypeError('find non-number variable');
    const xVal = x.unwrap();
    const yVal = y.unwrap();
    return xVal.divide(yVal);
  }

  static equal(x, y) {
    const isNumber = super.isType(TYPES.NUMBER, x);
    const isSame = super.isSameType(x, y);
    if(!isSame || !isNumber)
      throw new TypeError('find non-number variable');
    const xVal = x.unwrap();
    const yVal = y.unwrap();
    return xVal.equals(yVal);
  }

  defaultValue() {
    return new BigInt('0');
  }

  valueOf() {
    return TYPES.NUMBER;
  }
}

module.exports = NumberType;

//TODO: Change to BigInt