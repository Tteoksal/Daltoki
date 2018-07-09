const Type = require('./types/type');

class Variable {
  constructor(type, value = type.defaultValue()) {
    if(type != Type.inferenceType(value))
      throw new TypeError('unexpected value');
    this.type = type;
    this.value = value;
  }

  setValue(value) {
    if(!Type.isType(this.type, Type.inferenceType(value)))
      throw new TypeError('unexpected value');
    this.value = value;
    return value;
  }

  bind(method) {
    return () => this.type[method](this.value);
  }

  unwrap() {
    return this.value;
  }
}

module.exports = Variable;