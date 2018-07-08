const {Type, TYPES} = require('./type');

class StringType extends Type {
  constructor() {
    super(TYPES.STRING);
  }

  static add(x, y) {
    const isString = super.isType(TYPES.STRING, x);
    const isSame = super.isSameType(x, y);
    if(!isSame || !isString)
      throw new TypeError('find non-string variable');
    const xVal = x.unwrap();
    const yVal = y.unwrap();
    return xVal + yVal;
  }

  static mul(x, y) {
    const isString = super.isType(TYPES.STRING, x);
    const isNumber = super.isType(TYPES.NUMBER, y);
    if (!isString || !isNumber)
      throw new TypeError('wrong variable');
    const xVal = x.unwrap();
    let yVal = y.unwrap();
    let result = '';
    for (; yVal > 0; yVal--)
      result += xVal;
    return result;
  }

  static equal(x, y) {
    const isNumber = super.isType(TYPES.STRING, x);
    const isSame = super.isSameType(x, y);
    if(!isSame || !isNumber)
      throw new TypeError('find non-string variable');
    const xVal = x.unwrap();
    const yVal = y.unwrap();
    return xVal === yVal;
  }

  defaultValue() {
    return '';
  }
}

module.exports = StringType;