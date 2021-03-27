"use strict";

const service = require("egg").Service;

class UserService extends service {
  //查询用户是否存在
  async get(params) {
    const { app } = this;
    //User要大写
    const user = await app.model.User.findOne({
      where: {
        ...params,
      },
    });
    // console.log("UserService", user);
    return user;
  }

  async add(params) {
    const { app, ctx } = this;
    const createTime = +new Date() / 1000;//创建时间
    return await ctx.model.User.create({
      username: "admin",
      ...params,
      create_time: createTime,
    });
  }
}
//写完要暴露出去
module.exports = UserService;
