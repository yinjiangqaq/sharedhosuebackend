"use strict";

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

  const email = app.model.define(
    "email",
    {
      id: {
        type: INTEGER(11),
        primaryKey: true,
      },
      email: STRING(254),
      verifycode: STRING(20),
    },
    {
      freezeTableName: true,
      tableName: "email",
      timestamps: false,
      underscored: true,
    }
  );
  return email;
};

// CREATE TABLE sharehouse.email (
//     `id` int(11) NOT NULL AUTO_INCREMENT,
//     `email` varchar(254) DEFAULT NULL COMMENT '邮箱',
//     `verifycode` varchar(20) DEFAULT NULL COMMENT '邮箱验证码',
//      PRIMARY KEY (`id`)
//     )
//     ENGINE=InnoDB
//     DEFAULT CHARSET=utf8mb4
//     COLLATE=utf8mb4_0900_ai_ci;
