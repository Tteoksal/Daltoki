const BindingError = require('./binding-error');
const Binding = require('./binding');

class VariableRecord {
  constructor(outer = null) {
    this.outer = outer;
    this.record = new Map();
  }

  isExistBinding(name) {
    return this.record.has(name);
  }

  createBinding(name, value) {
    if (this.isExistBinding(name)) return false;
    const newBinding = new Binding(value);
    this.record.set(name, newBinding);
    return true;
  }

  initializeBinding(name, value) {
    if (this.isExistBinding(name))
      throw new BindingError(`the binding is doesn't exist`, name);
    const targetBinding = this.record.get(name);
    targetBinding.set(value);
    return true;
  }

  getBinding(name) {
    let scope = this;
    while (scope !== null) {
      let record = scope.record;
      if (scope.isExistBinding(name)) {
        return record.get(name);
      }
      scope = scope.outer;
    }

    return new Binding();
  }
}

module.exports = VariableRecord;