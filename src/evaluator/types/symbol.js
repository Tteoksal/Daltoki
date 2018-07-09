const Type = require('./type');
const TYPES = require('./types');

class SymbolType extends Type {
  constructor() {
    super(TYPES.NUMBER);
  }

  defaultValue() {
    throw new Error(`Symbol doesn't allow default value`);
  }

  valueOf() {
    return TYPES.SYMBOL;
  }
}

module.exports = SymbolType;