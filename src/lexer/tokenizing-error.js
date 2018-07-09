class TokenizingError extends Error {
  constructor(msg, info = "No Given Info") {
    super(`TokenizingError: ${msg} \n ${String(info)}`);
  }
}

module.exports = TokenizingError;