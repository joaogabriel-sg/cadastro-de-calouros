const isEmailValid = require('../../src/utils/isEmailValid');

describe('Is E-mail Valid', () => {
  test('should be a valid e-mail', () => {
    const email = 'jgsg@email.com';

    expect(isEmailValid(email)).toBe(true);
  });

  test('should be an invalid e-mail', () => {
    const email = 'jg#210_-*1jj@e___+11ema.9cmo';

    expect(isEmailValid(email)).toBe(false);
  });
});
