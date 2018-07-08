const TYPES = {
  NUMBER: Symbol('Number'),
  STRING: Symbol('String'),
  OBJECT: Symbol('Object'),
  FUNCTION: Symbol('Function'),
  NONE: Symbol('None')
};

class Type {
  constructor(type) {
    this.type = type;
  }

  static inferenceType(value) {
    let baseType = typeof value;
    let result = typeof TYPES.NONE;
    switch (true) {
      case baseType === 'number':
        result = TYPES.NUMBER;
        break;
      case baseType === 'string':
        result = TYPES.STRING;
        break;
      default:
        result = value === null ? TYPES.NONE : value.size ? TYPES.OBJECT : TYPES.FUNCTION
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

module.exports = {Type, TYPES};