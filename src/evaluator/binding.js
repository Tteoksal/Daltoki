const BINDING_STATUS = require('./binding-status');
const BindingError = require('./binding-error');

class Binding {
  constructor(value = null) {
    this.value = value;
    this.status =
      value !== null
        ? BINDING_STATUS.INITIALIZED
        : BINDING_STATUS.UNINITIALIZED;
  }

  isInitialized() {
    return this.status !== BINDING_STATUS.UNINITIALIZED;
  }

  get() {
    if (!this.isInitialized())
      throw new BindingError('accessing to uninitialized binding');
    return this.value;
  }

  set(value) {
    if (this.status === BINDING_STATUS.UNINITIALIZED)
      this.status = BINDING_STATUS.INITIALIZED;
    this.value = value;
    return (this.value = value);
  }
}

module.exports = Binding;