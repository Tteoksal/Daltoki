const TOKEN_TYPE = {
  BLANK: Symbol("BlankToken"),
  DIGIT: Symbol("DigitToken"),
  LEFT_CONT_COVER: Symbol("LeftContainerCoverToken"),
  RIGHT_CONT_COVER: Symbol("RightContainerCoverToken"),
  CLOSE_CONT_MARKER: Symbol("CloseContainerMarkerToken"),
  IDENTIFIER_CHAR: Symbol("IdentifierCharToken"),
  IDENTIFIER: Symbol("IdentifierToken"),
  NUMBER: Symbol("NumberToken"),
  EQUAL_OPERATOR: Symbol("EqualOperatorToken"),
  MEMBER_OPERATOR: Symbol("MemberOperatorToken"),
  CODE_COVER: Symbol("CodeCoverToken"),
  ANY_CHARACTER: Symbol("AnyCharacterToken"),
  STRING_BOARDER: Symbol("StringBoarderToken"),
  STRING: Symbol("StringToken")
};

module.exports = TOKEN_TYPE;