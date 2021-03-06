"use strict";
module.exports = (app) => {
  const { STRING, BIGINT, INTEGER } = app.Sequelize;
  //属性名都要是小写，驼峰会出问题
  const user = app.model.define(
    "user",
    {
      id: {
        type: INTEGER(11),
        primaryKey: true,
      },
      username: STRING(100),
      password: STRING(100),
      email: STRING(254),
      create_time: INTEGER(11),
      phone: STRING(20),
    },
    {
      freezeTableName: true,
      tableName: "user",
      timestamps: false,
      underscored: true,
    }
  );
  return user;
};

/**
 * 
 * 用户表:MYSQL
 *
 #
  CREATE TABLE sharehouse.`user` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`username` varchar(100) DEFAULT NULL COMMENT '用户名',
`password` varchar(100) DEFAULT NULL COMMENT '用户名',
`email` varchar(254) DEFAULT NULL COMMENT '邮箱',
`create_time`  INT(11) DEFAULT 0 COMMENT '创建时间',秒数,sql那边要驼峰
`phone` varchar(20) DEFAULT NULL COMMENT '手机号码',
 PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci
COMMENT='eggTest用户信息';
 */
