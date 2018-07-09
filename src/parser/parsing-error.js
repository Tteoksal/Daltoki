class ParsingError extends Error {
  constructor(msg, info = "No Given Info") {
    super(`ParsingError: ${msg} \n ${String(info)}`);
  }
}

module.exports = ParsingError;