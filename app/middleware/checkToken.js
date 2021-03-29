const MSG = "MIDDLEWARE CHECKTOKEN";

module.exports = (options) => {
  return async function checkToken(ctx, next) {
    const { app } = ctx;

    //拿到自定义目录constant中的code
    const { RESPONSE_CODE } = app.constant.code;
    //拿到请求的token
    const token = ctx.request.header.authorization;

    if (token) {
      try {
        let decode = ctx.app.jwt.verify(
          token,
          ctx.app.config.jwt.secret
          //错误处理
        );
        console.log(MSG, decode);
        ctx.user = {
          username: decode.username,
          email: decode.email,
          token: token,
        };
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          //token过期
          return ctx.fail({
            code: RESPONSE_CODE.TOKEN_CHECK_FAILED,
          });
        } else if (err.name === "JsonWebTokenError") {
          return ctx.fail({
            code: RESPONSE_CODE.TOKEN_CHECK_FAILED,
          });
        }
      }

      await next();
    } else {
      return ctx.fail({
        code: RESPONSE_CODE.TOKEN_CHECK_FAILED,
      });
    }
  };
};
