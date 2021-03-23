/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    env: "prod", //推荐云函数的egg运行环境修改为prod
    rundir: "/tmp",
    logger: {
      dir: "/tmp",
    },
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1615865843970_921";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    sequelize: {
      dialect: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "sharehouse",
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
