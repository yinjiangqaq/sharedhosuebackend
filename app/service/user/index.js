"use strict";

const service = require("egg").Service;

class UserService extends service {
  //查询用户是否存在
  async get(params) {
    const { app } = this;
    //User要大写
    const user = await app.model.User.findAll({
      where: {
        email: params.email,
        password: params.password,
      },
    });
    //console.log("UserService", user);
    return !!user.length;
  }
}
//写完要暴露出去
module.exports = UserService;
