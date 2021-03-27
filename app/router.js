"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, middleware } = app;

  router.get("/", controller.home.index);
  const subRouter = router.namespace("/api");
  //登录注册相关接口
  subRouter.post("/login", controller.user.index.login);

  //退出登录
  subRouter.get("/logout", controller.user.index.logout);

  //注册接口
  subRouter.post("/register", controller.user.index.register);

  //获取邮箱验证码

  subRouter.post(
    "/getVerifyCode",
    controller.user.index.getVerifyCode
  );
};
