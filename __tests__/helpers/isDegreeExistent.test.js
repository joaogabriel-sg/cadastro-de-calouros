const isDegreeExistent = require('../../src/helpers/isDegreeExistent');

describe('Is Degree Existent', () => {
  test('should be an existent degree', () => {
    const degree = 'Engenharia de Software';

    expect(isDegreeExistent(degree)).toBe(true);
  });

  test('should be an invalid or non-existent degree', () => {
    const degree = 'Psicologia';

    expect(isDegreeExistent(degree)).toBe(false);
  });
});
