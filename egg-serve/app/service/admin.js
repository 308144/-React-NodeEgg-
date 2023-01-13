const Service = require("egg").Service;
const jwt = require("jsonwebtoken");
const helper = require("../extend/helper");
class AdminService extends Service {
  // 登录页的查询用户
  async adminLogin(body) {
    const { ctx } = this;
    const oldUser = await ctx.model.Admin.findOne({ userName: body.userName });
    // console.log('ctx11',ctx.app.config.jwt.secret);
    if (!oldUser) {
      return {
        msg: "用户不存在",
        code: 1,
      };
    } else {
      const isMatch = await ctx.helper.comparePassword(
        body.password,
        oldUser.password
      );
      console.log(body.password, oldUser.password);
      if (!isMatch) {
        return {
          msg: "手机号或密码错误",
          code: 1,
        };
      } else {
        //  此方法接收两个参数,第一个是要加密保存的数据(一个对象,不要放隐秘性的数据,如密码),第二个是要加密的私钥(一个字符串,越乱越好),第三个是配置项
        let token = jwt.sign(
          { ...oldUser },
          //  ctx.app.config.jwt.secret
          "123",
          {
            expiresIn: '48h',
          }
        );
        ctx.cookies.set("token", token, {
          maxAge: 86400000,
          httpOnly: false,
        });
        return {
          data: {
            userId: 1,
            token: token,
            userName: body.userName,
          },
          msg: "登录成功",
          code: 0,
        };
      }
    }
  }
  // 登录页的查询用户
  async middlewareFindOne(body) {
    const { ctx } = this;
    const oldUser = await ctx.model.Admin.findOne({ userName: body.userName });
    return oldUser
  }

  // 退出登录
  async adminLogout() {
    const { ctx } = this;
    ctx.cookies.set("token", "", {
      maxAge: 0,
    });
    return {
      message: "退出成功",
      code: 0,
    };
  }
  // 删除
  // { n: 1, ok: 1, deletedCount: 1 }返回的res
  async adminRemove(id) {
    const { ctx } = this;
    const res = await ctx.model.Admin.deleteOne({ _id: id });
    console.log("res", res);
    if (res.ok === 1) {
      return {
        message: "删除成功",
        code: 0,
        success: true,
      };
    }
  }
  // 创建数据
  // { _id: 63aec9582b0c935218ced3cc, userName: '123456', password: 'asdf' }
  async adminCreate(body) {
    const { ctx } = this;
    await ctx.model.Admin.create(body);
    console.log(body);
    return {
      code: 0,
      success: true,
      message: "创建用户成功",
    };
  }
}

module.exports = AdminService;
