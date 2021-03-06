const TYPES = require('./types');

class Type {
  constructor(type) {
    this.type = type;
  }

  static inferenceType(value) {
    let baseType = typeof value;
    let result;
    switch (true) {
      case baseType === 'string':
        result = TYPES.STRING;
        break;
      case baseType === 'symbol':
        result = TYPES.SYMBOL;
        break;
      default:
        result = typeof value.size === 'number' ? TYPES.OBJECT : value.constructor.one ? TYPES.NUMBER : TYPES.FUNCTION;
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

  static call(variable) {
    return variable;
  }
}

module.exports = Type;