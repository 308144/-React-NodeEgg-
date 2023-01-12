/** 登录接口参数 */
export interface ILoginParams {
  userName: string
  password: string
}

/** 登录接口响应 */
export interface ILoginDatas {
  code: 0
  data: ILoginData
  message: string
}
export interface ILoginData {
  userId: number
  token: string
  user: { userName: string; password: string }
}
