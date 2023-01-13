module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有异常都在app上触发一个error事件，框架会记录一条错误日志
      ctx.app.emit("error", err, ctx);
      let status = err.status || 500;
      if (err.message === "jwt expired") {
        status = 403;
      }
      const error =
        (status === 500) & (ctx.app.config.env === "prod")
          ? "Internal  Server Error"
          : err.message;
      ctx.body = error;
      ctx.status = status;
    }
  };
};
