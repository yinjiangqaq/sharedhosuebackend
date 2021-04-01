"use strict";

module.exports = (appInfo) => {
  const config = {};
  config.squelize = {
    dialect: "mysql",
    host: "sharehouse_mysql", //对应docker-compose.yml里面的容器
    port: 3306,
    username: "root",
    password: "root",
    database: "sharehouse",
  };
  return config;
};
