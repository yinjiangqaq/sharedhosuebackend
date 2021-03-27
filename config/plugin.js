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
  redis: {
    enable: true,
    package: "egg-redis",
  },
  jwt: {
    enable: true,
    package: "egg-jwt",
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
