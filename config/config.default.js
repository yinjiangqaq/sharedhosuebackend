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
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1615865843970_921";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    //本地是localhost,线上是sharehouse_mysql
    sequelize: {
      dialect: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "sharehouse",
    },
    //解决跨域
    cors: {
      origin: "*",
      allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
    },
    //关闭csrf
    security: {
      csrf: {
        enable: false,
      },
    },
    //jwt加密字符串
    jwt: {
      secret: "sharedhouse",
    },
    //加载的额外的文件夹,app.constant
    loaderDirs: ["constant"],
    blockChain_Baseurl: "http://121.4.149.18:5002/WeBASE-Front/trans/handleWithSign",
  };

  return {
    ...config,
    ...userConfig,
  };
};
