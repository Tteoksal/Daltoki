class BindingError extends Error {
  constructor (msg,info = 'No Given Info') {
    super(`BindingError: ${msg} \n ${String(info)}`);
  }
}

module.exports = BindingError;