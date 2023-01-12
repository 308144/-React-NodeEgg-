module.exports = () => {
  return async (ctx, next) => {
    const currentUrl = ctx.request.url;
    // console.log(currentUrl);

    const urlWhiteList = ["/login", "/logout"];

    const isIfValidate = urlWhiteList.some((item) => currentUrl.includes(item));
    // console.log(isIfValidate);

    if (isIfValidate) {
      return await next();
    } else {
      const cookie = ctx.headers.cookie;
      if (cookie) {
        const token = cookie.slice(6).split(";")[0];
        const jwtToken = await ctx.app.jwt.verify(token, "123");
        const userName = jwtToken._doc.userName;
        // console.log("userName",userName);
        const mongodbUserName = await ctx.service.admin.middlewareFindOne({
           userName
        });
        if (mongodbUserName.userName) {
          return await next();
        }else {
          ctx.helper.success({
            ctx,
            res: {
              status:403,
              msg: "用户不匹配（token匹配不对）",
              code: 0,
              data: null,
            },
          });
        }
      } else {
        ctx.helper.success({
          ctx,
          res: {
            status:401,
            msg: "无权限访问（无cookie）",
            code: 0,
            data: null,
          },
        });
      }
    }
  };
};
