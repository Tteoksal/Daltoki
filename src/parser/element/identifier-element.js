const ELEMENT_KIND = require('./element-kind');
const Element = require('./element');

class IdentifierElement extends Element {
  constructor(identifier) {
    super(ELEMENT_KIND.IDENTIFIER, identifier);
  }

  eval(scope) {
    const identifier = this.value;
    const binding = scope.getBinding(identifier);
    const variable = binding.get();
    return variable;
  }
}

module.exports = IdentifierElement;