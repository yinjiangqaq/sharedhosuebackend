const MSG = "MIDDLEWARE CHECKTOKEN";

module.exports = (options) => {
  return async function checkToken(ctx, next) {
    const { app } = ctx;

    //拿到自定义目录constant中的code
    const { RESPONSE_CODE } = app.constant.code;
    //拿到请求的token
    const token = ctx.request.header.authorization;

    if (token) {
      let decode = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
      ctx.user = {
        username: user.username,
        email: user.email,
        token: token,
      };
      console.log(MSG, decode);
      await next();
    } else {
      return ctx.fail({
        code: RESPONSE_CODE.TOKEN_CHECK_FAILED,
      });
    }
  };
};
