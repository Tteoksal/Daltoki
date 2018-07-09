const TYPES = require('./types');

class Type {
  constructor(type) {
    this.type = type;
  }

  static inferenceType(value) {
    let baseType = typeof value;
    let result;
    switch (true) {
      case baseType === 'number':
        result = TYPES.NUMBER;
        break;
      case baseType === 'string':
        result = TYPES.STRING;
        break;
      case baseType === 'symbol':
        result = TYPES.SYMBOL;
        break;
      default:
        result = typeof value.size === 'number' ? TYPES.OBJECT : TYPES.FUNCTION;
    }
    return result;
  }

  static isSameType(...types) {
    const specimen = types[0].constructor;
    return types.some(type => type.constructor === specimen);
  }

  static isType(type, variable) {
    return type === variable.type;
  }
}

module.exports = Type;