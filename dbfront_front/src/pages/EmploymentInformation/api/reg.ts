// 手机号
export const Iphone_reg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/

//正整数数字正则
export const maxNumReg = /^[1-9][0-9]{0,}$/

export const formRules = {
  // 手机号验证
  IphoneReg: [
    {
      required: true,
      validator(_, value) {
        if (value === undefined || value === '') {
          return Promise.reject(new Error(`请输入手机号`))
        } else if (!Iphone_reg.test(value)) {
          return Promise.reject(new Error(`请输入正确的手机号`))
        } else {
          return Promise.resolve()
        }
      },
    },
  ],
}

