'use strict';

// had enabled by egg
// exports.static = true;

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
exports.routerPlus = {
  enable: true,
  package: 'egg-router-plus',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};
