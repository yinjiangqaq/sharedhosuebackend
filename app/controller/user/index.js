"use strict";

const controller = require("egg").Controller;
const nodemailer = require("nodemailer");

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
    // console.log("UserLoginController", user);
    if (!user) {
      return ctx.fail({ code: 403, msg: "账号密码错误" });
    } else {
      const token = app.jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        app.config.jwt.secret, //加密的密钥
        {
          expiresIn: "10h", //过期时间
        }
      );
      console.log("UserLoginController", token);

      // try {
      //   await app.redis.set(`token_${user.username}`, token); //后端存储token
      //   return ctx.success({ data: token, msg: " 登录成功 " });
      // } catch (e) {
      //   return ctx.fail({ code: 500, msg: "server busy" });
      // }
      return ctx.success({ data: token, msg: " 登录成功 " });
    }
  }

  async logout() {
    const { ctx, app } = this;
    return ctx.success({ msg: "退出登录" });
  }

  async register() {
    const { ctx, app } = this;
    const query = ctx.request.body;
    const option = {
      email: query.email,
      password: query.password,
      // verifycode: query.verifycode, //邮箱验证码
    };

    if (!query.email) {
      app.throwError(400, "账号不能为空");
    }
    if (!query.password) {
      app.throwError(400, "密码不能为空");
    }
    if (!query.verifycode) {
      app.throwError(400, "验证码不能为空");
    }
    //需要await的原因是因为返回的是一个promise，需要等他执行完
    const email = await ctx.service.email.index.get({
      email: query.email,
      verifycode: query.verifycode,
    });
    console.log("UserController", email);
    if (email) {
      await ctx.service.user.index.add(option);
      return ctx.success({ msg: "注册成功" });
    } else {
      return ctx.fail({ msg: "验证码错误" });
    }
  }

  //原理是，通过nodemailer这个包，然后发送方自己打开POP3服务，然后用nodemailer配置好smtp对象transporter,然后后台随机生成验证码，后台存储一份，以便到时候注册接口验证
  //然后讲这个验证码，发送给这个接口接受的邮箱。
  async getVerifyCode() {
    const { ctx, app } = this;
    const query = ctx.request.body;
    const email = query.email;
    const emailConfig = {
      host: "smtp.163.com",
      port: 465,
      auth: {
        user: "15918871221@163.com",
        pass: app.config.smtp_password, //授权密码
      },
    };
    //创建一个smtp客户端对象
    const transporter = nodemailer.createTransport(emailConfig);
    const user = await ctx.service.user.index.get({ email: email });
    if (user) {
      return ctx.fail({ msg: "该邮箱已注册,请使用别的邮箱" });
    } else {
      const code = Math.random().toString().slice(-6); //生成验证码

      const mail = {
        from: "15918871221@163.com",
        subject: "邮箱验证码",
        to: email,
        text: `你的邮箱验证码为${code}`,
      };
      //将获取到的邮箱验证码存进数据库
      await ctx.service.email.index.add({ email: email, verifycode: code });
      //发送邮件
      await transporter.sendMail(mail, (err, info) => {
        if (err) {
          return console.log(ree);
        }
      });
      return ctx.success({ msg: "该邮箱可用,邮箱验证码已经发送" });
    }
  }

  async getUserInfo() {
    const { app, ctx } = this;
    const { RESPONSE_CODE } = app.constant.code;
    // console.log("UserController", ctx.user);
    if (ctx.user) {
      const user = await ctx.service.user.index.get({ email: ctx.user.email });
      //不直接返回密码了
      return ctx.success({ data: ctx.user, msg: "返回用户信息" });
    } else {
      return ctx.fail({
        code: RESPONSE_CODE.TOKEN_CHECK_FAILED,
      });
    }
  }
}

module.exports = UserController;
