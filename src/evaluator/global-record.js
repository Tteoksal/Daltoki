const VariableRecord = require('./variable-record');
const global = new VariableRecord();
const Variable = require('./variable');
const ObjectType = require('./types/object');
const NumberType = require('./types/number');

global.createBinding('nil', new Variable(new ObjectType(), new Map()));
global.createBinding('false', new Variable(new NumberType(), 0));
global.createBinding('true', new Variable(new NumberType(), 1));

module.exports = global;