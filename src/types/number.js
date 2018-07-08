const {Type, TYPES} = require('./type');

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
    return xVal + yVal;
  }

  static sub(x, y) {
    const isNumber = super.isType(TYPES.NUMBER, x);
    const isSame = super.isSameType(x, y);
    if(!isSame || !isNumber)
      throw new TypeError('find non-number variable');
    const xVal = x.unwrap();
    const yVal = y.unwrap();
    return xVal - yVal;
  }

  static mul(x, y) {
    const isNumber = super.isType(TYPES.NUMBER, x);
    const isSame = super.isSameType(x, y);
    if(!isSame || !isNumber)
      throw new TypeError('find non-number variable');
    const xVal = x.unwrap();
    const yVal = y.unwrap();
    return xVal * yVal;
  }

  static div(x, y) {
    const isNumber = super.isType(TYPES.NUMBER, x);
    const isSame = super.isSameType(x, y);
    if(!isSame || !isNumber)
      throw new TypeError('find non-number variable');
    const xVal = x.unwrap();
    const yVal = y.unwrap();
    return Math.round(xVal / yVal);
  }

  static equal(x, y) {
    const isNumber = super.isType(TYPES.NUMBER, x);
    const isSame = super.isSameType(x, y);
    if(!isSame || !isNumber)
      throw new TypeError('find non-number variable');
    const xVal = x.unwrap();
    const yVal = y.unwrap();
    return xVal === yVal;
  }

  defaultValue() {
    return 0;
  }
}

module.exports = NumberType;

//TODO: Change to BigInt