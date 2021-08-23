const isCepValid = require('../../src/utils/isCepValid');

describe('Is CEP Valid', () => {
  test('should be a valid CEP', () => {
    const cep = 63870000;

    expect(isCepValid(cep)).toBe(true);
  });

  test('should be an invalid CEP', () => {
    const cep = 123456789000;

    expect(isCepValid(cep)).toBe(false);
  });

  test('should be an invalid CEP when string', () => {
    const cep = '63870000';

    expect(isCepValid(cep)).toBe(false);
  });

  test('should be an invalid CEP when it has at least one letter or special character', () => {
    const cep = '638700!!a';

    expect(isCepValid(cep)).toBe(false);
  });
});
