import moment from 'moment'

// ProTable返回数据进行整理
export function convertListDataToProTable(res) {
  const output = {
    current: 1,
    data: [],
    pageSize: '20',
    success: false,
    total: 0,
  }

  if (res.code === 0) {
    const { data } = res

    if (!data) {
      return output
    }

    Object.assign(output, {
      success: true,
      data: data.records,
      current: data.current,
      pageSize: data.size,
      total: data.total,
    })
  }

  return output
}
export function DpGo(path: string): void {
  window.location.hash = `${path}$`
}
/** 调起系统文件选择器 */
export function selectFile(accept: string, callback: (n) => void) {
  const input = document.createElement('input')

  input.type = 'file'
  input.accept = `${accept}`
  input.click()
  input.onchange = () => {
    if (input.files) {
      const file = input.files[0]

      callback(file)
    }
  }
}

// 手机号验证
/**
 *  正则存储
 *  @author coiner
 * * */
// 手机号正则
const Iphone_reg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
const Email_reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/

// 手机号验证
export const phoneRules = {
  phoneExtensionsData: [
    {
      require: true,
      validator(_, value: string) {
        if (value === undefined || value === '' || !isNaN(Number(value)) === false) {
          return Promise.reject(new Error(`请输入手机号`))
        } else if (!Iphone_reg.test(value)) {
          return Promise.reject(new Error(`请输入正确手机号`))
        } else {
          return Promise.resolve()
        }
      },
    },
  ],
  emailExtensionsData: [
    {
      require: true,
      validator(_, value: string) {
        if (value === undefined || value === '' ) {
          return Promise.reject(new Error(`请输入邮箱`))
        } else if (!Email_reg.test(value)) {
          return Promise.reject(new Error(`请输入正确邮箱`))
        } else {
          return Promise.resolve()
        }
      },
    },
  ],
}

/* 时间戳转为momoent对象 */
export function timeToMomentObj(time: number) {
  const dateTime = moment(time).format('YYYY-MM-DD HH:mm:ss')
  const momentObj = moment(dateTime, 'YYYY-MM-DD HH:mm:ss')

  return momentObj
}
