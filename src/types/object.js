const {Type, TYPES} = require('./type');

class ObjectType extends Type {
  constructor() {
    super(TYPES.OBJECT);
  }

  static extends(base) {
    const isObject = super.isType(TYPES.OBJECT, base);
    if(!isObject)
      throw new TypeError('find non-number variable');
    return new Map(Object.entries(base.unwrap()));
  }

  static get(obj, key) {
    const isObject = super.isType(TYPES.OBJECT, obj);
    const isString = super.isType(TYPES.STRING, key);
    if(!isObject || !isString)
      throw new TypeError('find wrong variable');
    const propKey = key.unwrap();
    const targetObject = obj.unwrap();
    return targetObject.get(propKey);
  }

  static set(obj, key, val) {
    const isObject = super.isType(TYPES.OBJECT, obj);
    const isString = super.isType(TYPES.STRING, key);
    if(!isObject || !isString)
      throw new TypeError('find wrong variable');
    const propKey = key.unwrap();
    const propVal = val.unwrap();
    const targetObject = obj.unwrap();
    return targetObject.set(propKey, propVal);
  }

  static has(obj, key) {
    const isObject = super.isType(TYPES.OBJECT, obj);
    const isString = super.isType(TYPES.STRING, key);
    if(!isObject || !isString)
      throw new TypeError('find wrong variable');
    const propKey = key.unwrap();
    const targetObject = obj.unwrap();
    return targetObject.has(propKey);
  }

  static equal(x, y) {
    const isObject = super.isType(TYPES.OBJECT, x);
    const isSame = super.isSameType(x, y);
    if(!isObject || !isSame)
      throw new TypeError('find non-object variable');
    const xVal = x.unwrap();
    const yVal = y.unwrap();
    return xVal === yVal;
  }

  defaultValue() {
    return new Map();
  }
}

module.exports = ObjectType;