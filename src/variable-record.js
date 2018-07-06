module.exports = (() => {
  const BINDING_STATUS = {
    INITIALIZED: Symbol('initialized'),
    UNINITIALIZED: Symbol('uninitialized'),
  };

  class BindingError extends Error {
    constructor (msg,info = 'No Given Info') {
      super(`BindingError: ${msg} \n ${String(info)}`);
    }
  }

  class Binding {
    constructor(value = null) {
      this.value = value;
      this.status = value !== null ? BINDING_STATUS.INITIALIZED : BINDING_STATUS.UNINITIALIZED;
    }

    isInitialized() {
      return this.status !== BINDING_STATUS.UNINITIALIZED;

    }

    get() {
      if(this.isInitialized())
        throw new BindingError('accessing to uninitialized binding');
      return this.value;
    }

    set(value) {
      this.status = BINDING_STATUS.INITIALIZED;
      this.value = value;
      return this.value = value;
    }
  }

  class VariableRecord {
    constructor(outer = null) {
      this.outer = outer;
      this.record = new Map();
    }

    isExistBinding(name) {
      return this.record.has(name);
    }

    createBinding(name, value) {
      if(this.isExistBinding(name))
        return false;
      const newBinding = new Binding(value);
      this.record.set(name, newBinding);
      return true;
    }

    initializeBinding(name, value) {
      if(this.isExistBinding(name))
        throw new BindingError(`the binding is doesn't exist`, name);
      const targetBinding = this.record.get(name);
      targetBinding.set(value);
      return true;
    }

    getBinding(name) {
      let scope = this;
      let record = this.record;
      while(scope !== null) {
        if(scope.isExistBinding(name)) {
          return record.get(name);
        }
        scope = scope.outer;
        record = scope.record;
      }

      return new Binding();
    }
  }

  return VariableRecord;
})();