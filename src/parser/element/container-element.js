const ELEMENT_KIND = require('./element-kind');
const Element = require('./element');

class ContainerElement extends Element {
  constructor(func, attributes, body) {
    super(ELEMENT_KIND.CONTAINER, { function: func, attributes, body });
  }

  eval(scope) {
    const func = this.value.function.eval(scope);
    const attrs = this.value.attributes.map(attr => attr.eval(scope));
    const body = this.value.body.map(exp => exp.eval(scope));
    const funcType = func.type.constructor;
    return funcType.call(func, attrs, body);
  }
}

module.exports = ContainerElement;