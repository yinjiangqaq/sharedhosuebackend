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

  subRouter.post("/getVerifyCode", controller.user.index.getVerifyCode);

  //获取管理员用户信息
  subRouter.get(
    "/getUserInfo",
    middleware.checkToken(),
    controller.user.index.getUserInfo
  );
  //获取用户列表信息
  subRouter.get(
    "/getUserList",
    middleware.checkToken(),
    controller.customer.index.getUserList
  );

  //公寓配置相关接口

  //新增房屋配置
  subRouter.post(
    "/addRoom",
    middleware.checkToken(),
    controller.room.index.addRoom
  );
  //查找房屋

  subRouter.post(
    "/findRoom",
    middleware.checkToken(),
    controller.room.index.findRoom
  );
  //更改房屋配置
  subRouter.post(
    "/changeRoom",
    middleware.checkToken(),
    controller.room.index.changeRoom
  );

  subRouter.post(
    "/deleteRoom",
    middleware.checkToken(),
    controller.room.index.deleteRoom
  );

  //公共设施配置接口
  //新增
  subRouter.post(
    "/addDevice",
    middleware.checkToken(),
    controller.device.index.addDevice
  );
  //查找
  subRouter.post(
    "/findDevice",
    middleware.checkToken(),
    controller.device.index.findDevice
  );
  //更改
  subRouter.post(
    "/changeDevice",
    middleware.checkToken(),
    controller.device.index.changeDevice
  );
  //删除
  subRouter.post(
    "/deleteDevice",
    middleware.checkToken(),
    controller.device.index.deleteDevice
  );
};
