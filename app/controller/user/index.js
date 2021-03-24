"use strict";

const controller = require("egg").Controller;

class UserController extends controller {
  /**
   * 接口描述
   * 用户登录
   * 请求方式：post
   * 参数：{
   * account：string
   *
   * password: string
   * }
   */

  async login() {
    const { ctx, app } = this;
    const query = ctx.request.body;
    //this.logger.info('[UserController]')
    const option = {
      email: query.email,
      password: query.password,
    };
    
    if (!query.email) {
      app.throwError(400, "账号不能为空");
    }
    if (!query.password) {
      app.throwError(400, "密码不能为空");
    }

    const user = await ctx.service.user.index.get(option);
    console.log("UserLoginController", user);
    if (!user) {
      return ctx.fail({ msg: "账号密码错误" });
    } else {
      return ctx.success({ msg: " 登录成功 " });
    }
  }
}

module.exports = UserController;
