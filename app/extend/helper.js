const bcrypt = require('bcryptjs');
const filter = require('./filter');
exports.bhash = str => {
  return bcrypt.hashSync(str, 10);
};

exports.bcompare = (str, hash) => {
  return bcrypt.compareSync(str, hash);
};

Object.assign(exports, filter)
