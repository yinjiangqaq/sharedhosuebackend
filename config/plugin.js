"use strict";

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  vaidate: {
    enable: true,
    package: "egg-validate",
  },
  cors: {
    enable: true,
    package: "egg-cors",
  },
  sequelize: {
    enable: true,
    package: "egg-sequelize",
  },
  routerPlus: {
    enable: true,
    package: "egg-router-plus",
  },
};
