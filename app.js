'use strict';

const path = require('path');
const fs = require('fs');

/**
 * @param {Egg.Application} app - egg application
 */
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用
  //  this.loadConfig();
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
    // 例如：加载自定义的目录
    this.loadDirs();
   //
  }

  /**
   * @description 不同环境加载config文件
   *
   */
  loadConfig() {
    const { app } = this;

    if (['local', 'test', 'unittest'].includes(app.config.env)) {
      return;
    }

    const toHump = name => {
      return name.replace(/\_(\w)/g, function (all, letter) {
        return letter.toUpperCase();
      });
    };

    let config = null;
    try {
      config = app.apolloConfig.getConfig('node-tob-apollo', 'application', 'db_redis_config');
      app.logger.info('apollo config：', config);
      config = JSON.parse(config);
    } catch (err) {
      app.logger.info('parse apollo config error：', err);
      config = null;
    }

    if (!config) return;

    const clients = {};
    const datasources = [];
    const configDdNameArr = app.config.sequelize.datasources.map(
      item => item.delegate
    );
    const configRedisNameArr = Object.keys(app.config.redis.clients);

    Object.keys(config).forEach(key => {
      const dbKey = toHump(key);
      if (configDdNameArr.includes(dbKey)) {
        datasources.push({
          delegate: dbKey, // load all models to app.adminModel and ctx.adminModel
          baseDir: `model/${dbKey}`, // load models from `app/admin_model/*.js`
          dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
          database: config[key].db,
          host: config[key].ip,
          port: config[key].port,
          username: config[key].user,
          password: config[key].password,
          dbtype: config[key].type,
          define: {
            timestamps: false,
            freezeTableName: true
          }
        });
      } else if (configRedisNameArr.includes(dbKey)) {
        clients[dbKey] = {
          port: config[key].port, // Redis port
          host: config[key].ip, // Redis host
          password: config[key].password,
          db: config[key].db
        };
      }
    });
    app.logger.info('redis config:', clients, 'db config:', datasources);
    app.config.redis.clients = clients;
    app.config.sequelize.datasources = datasources;
  }

  loadDirs() {
    const { app } = this;
    app.config.loaderDirs.forEach(dir => {
      app.loader.loadToApp(path.join(__dirname, `app/${dir}`), `${dir}`, {
        fieldClass: `${dir}Classes`,
        initializer(factory) {
          if (typeof factory === 'function') {
            return new factory(app);
          }
          return factory;
        },
      });
    });
  }

}

module.exports = AppBootHook;
