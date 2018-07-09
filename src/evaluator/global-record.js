const VariableRecord = require('./variable-record');
const global = new VariableRecord();
const Variable = require('./variable');
const ObjectType = require('./types/object');
const NumberType = require('./types/number');
const BigInt = require("big-integer");

global.createBinding('nil', new Variable(new ObjectType, new Map()));
global.createBinding('false', new Variable(new NumberType, new BigInt('0')));
global.createBinding('true', new Variable(new NumberType, new BigInt('1')));

module.exports = global;