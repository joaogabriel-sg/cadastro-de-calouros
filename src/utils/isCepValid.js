function isCepValid(cep) {
  return String(cep).length === 8;
}

module.exports = isCepValid;
