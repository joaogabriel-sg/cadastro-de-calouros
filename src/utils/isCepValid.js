function isCepValid(cep) {
  if (typeof cep === 'string') {
    return false;
  }

  return String(cep).length === 8;
}

module.exports = isCepValid;
