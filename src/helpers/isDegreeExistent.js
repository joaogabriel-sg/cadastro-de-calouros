const degrees = require('../mocks/degrees');

function isDegreeExistent(degreeName) {
  return degrees.some((degree) => degree === degreeName);
}

module.exports = isDegreeExistent;
