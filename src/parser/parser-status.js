const PARSER_STATUS = {
  NONE: Symbol("None"),
  NUMBER: Symbol("Number"),
  CONTAINER_HEAD: Symbol("ContainerHead"),
  CONTAINER_BODY: Symbol("ContainerBody"),
  CONTAINER_FUNC: Symbol("ContainerFunc"),
  ATTRIBUTE: Symbol("Attribute"),
  IDENTIFIER: Symbol("Identifier"),
  MEMBER_OPERATOR: Symbol("MemberOperator"),
  CONTAINER: Symbol("Container"),
  STRING: Symbol("String")
};

module.exports = PARSER_STATUS;